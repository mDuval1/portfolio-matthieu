<script setup lang="ts">
// Minimalist editorial double-page spread viewer built on Mozilla pdf.js.
//   • Cover (page 1) shown standalone; inside pages paired (2–3, 4–5, …);
//     a lone last page is shown standalone too.
//   • Only the current spread's canvases are mounted in the DOM; the immediate
//     prev/next pages are pre-decoded (pdf.js page cache) so navigation is snappy
//     while memory stays low.
//   • Canvases preserve the PDF's exact aspect ratio and the whole spread is
//     scaled to *contain* within the viewport — no clipping, no distortion.
// Client-only: pdf.js touches canvas/workers, so all work happens after mount.
import type { PDFDocumentProxy, PDFDocumentLoadingTask, RenderTask } from 'pdfjs-dist'

const props = defineProps<{
  src: string
  /** Accessible label for the document (used on the region + arrows). */
  title?: string
}>()

const wrap = ref<HTMLElement | null>(null)
const loading = ref(true)
const error = ref('')
const index = ref(0)
const spreads = ref<number[][]>([])

let pdfDoc: PDFDocumentProxy | null = null
let loadingTask: PDFDocumentLoadingTask | null = null
let tasks: RenderTask[] = []
let resizeObs: ResizeObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | undefined

const total = computed(() => spreads.value.length)
const currentPages = computed(() => spreads.value[index.value] ?? [])

const pad = (n: number) => String(n).padStart(2, '0')
const label = computed(() => {
  const p = currentPages.value
  if (!p.length) {
    return ''
  }
  return p.length === 1 ? `Page ${pad(p[0]!)}` : `Pages ${pad(p[0]!)}–${pad(p[1]!)}`
})

// Cover standalone, then pairs from page 2; a lone final page stays standalone.
function buildSpreads(n: number): number[][] {
  const out: number[][] = []
  if (n >= 1) {
    out.push([1])
  }
  for (let p = 2; p <= n; p += 2) {
    out.push(p + 1 <= n ? [p, p + 1] : [p])
  }
  return out
}

function cancelTasks() {
  for (const t of tasks) {
    try {
      t.cancel()
    } catch {
      /* already settled */
    }
  }
  tasks = []
}

// Decode neighbouring pages so the next/prev spread renders instantly.
function prefetch(i: number) {
  const sp = spreads.value[i]
  if (sp && pdfDoc) {
    for (const p of sp) {
      pdfDoc.getPage(p).catch(() => {})
    }
  }
}

async function renderSpread() {
  if (!pdfDoc || !wrap.value) {
    return
  }
  await nextTick()
  cancelTasks()
  const canvases = [...wrap.value.querySelectorAll<HTMLCanvasElement>('canvas.pdf-canvas')]
  const pages = currentPages.value
  if (!canvases.length || !pages.length) {
    return
  }

  // No layout yet (container not sized): bail and let the ResizeObserver re-render
  // once the viewport has real dimensions — never render to a 0×0 canvas.
  const cw = wrap.value.clientWidth
  const ch = wrap.value.clientHeight
  if (!cw || !ch) {
    return
  }

  // Natural spread dimensions (at scale 1), then "contain" within the viewport.
  const proxies = await Promise.all(pages.map(p => pdfDoc!.getPage(p)))
  const base = proxies.map(pg => pg.getViewport({ scale: 1 }))
  const spreadW = base.reduce((sum, v) => sum + v.width, 0)
  const spreadH = Math.max(...base.map(v => v.height))
  const fit = Math.min(cw / spreadW, ch / spreadH)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  await Promise.all(proxies.map((page, i) => {
    const canvas = canvases[i]
    if (!canvas) {
      return Promise.resolve()
    }
    const vp = page.getViewport({ scale: fit * dpr })
    canvas.width = Math.floor(vp.width)
    canvas.height = Math.floor(vp.height)
    canvas.style.width = `${Math.floor(vp.width / dpr)}px`
    canvas.style.height = `${Math.floor(vp.height / dpr)}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return Promise.resolve()
    }
    const task = page.render({ canvas, canvasContext: ctx, viewport: vp })
    tasks.push(task)
    return task.promise.catch(() => {})
  }))

  prefetch(index.value + 1)
  prefetch(index.value - 1)
}

function go(delta: number) {
  const next = index.value + delta
  if (next >= 0 && next < total.value) {
    index.value = next
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    go(1)
  } else if (e.key === 'ArrowLeft') {
    go(-1)
  }
}

onMounted(async () => {
  try {
    const pdfjs = await import('pdfjs-dist')
    const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default
    loadingTask = pdfjs.getDocument({ url: props.src })
    pdfDoc = await loadingTask.promise
    spreads.value = buildSpreads(pdfDoc.numPages)
    loading.value = false
    await renderSpread()
    window.addEventListener('keydown', onKey)
    resizeObs = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(renderSpread, 150)
    })
    resizeObs.observe(wrap.value!)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unable to load the document.'
    loading.value = false
  }
})

watch(index, renderSpread)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clearTimeout(resizeTimer)
  resizeObs?.disconnect()
  cancelTasks()
  void loadingTask?.destroy()
})
</script>

<template>
  <div
    class="flex flex-col items-center gap-4"
    role="region"
    :aria-label="title || 'PDF viewer'"
  >
    <div
      ref="wrap"
      class="relative flex h-[78vh] w-full items-center justify-center overflow-hidden"
    >
      <!-- States -->
      <p
        v-if="loading"
        class="font-sans text-sm text-muted"
      >
        …
      </p>
      <div
        v-else-if="error"
        class="max-w-sm text-center font-sans text-sm text-muted"
      >
        <p>{{ error }}</p>
        <ULink
          :to="src"
          target="_blank"
          external
          class="mt-2 inline-block text-highlighted underline"
        >
          {{ title || 'Open the PDF' }}
        </ULink>
      </div>

      <!-- Spread (keyed → fade-in on change). object-contain fidelity. -->
      <div
        v-else
        :key="index"
        class="spread-stage flex h-full w-full items-center justify-center gap-0"
      >
        <canvas
          v-for="p in currentPages"
          :key="p"
          class="pdf-canvas block max-h-full max-w-full object-contain shadow-magazine"
        />
      </div>

      <!-- Controls: fine anthracite chevrons on the edges -->
      <button
        v-if="!loading && !error && total > 1"
        type="button"
        class="group absolute left-2 top-1/2 -translate-y-1/2 p-3 text-highlighted transition disabled:pointer-events-none disabled:opacity-20 sm:left-4"
        :disabled="index === 0"
        aria-label="Previous spread"
        @click="go(-1)"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform group-hover:-translate-x-0.5"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        v-if="!loading && !error && total > 1"
        type="button"
        class="group absolute right-2 top-1/2 -translate-y-1/2 p-3 text-highlighted transition disabled:pointer-events-none disabled:opacity-20 sm:right-4"
        :disabled="index === total - 1"
        aria-label="Next spread"
        @click="go(1)"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Discreet status indicator (Helvetica / sans) -->
    <p
      v-if="!loading && !error"
      class="font-sans text-xs uppercase tracking-wider text-muted"
    >
      {{ label }} · {{ index + 1 }} / {{ total }}
    </p>
  </div>
</template>

<style scoped>
/* Subtle fade + lift when a new spread keys in. */
.spread-stage {
  animation: spreadIn 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes spreadIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .spread-stage {
    animation: none;
  }
}
</style>
