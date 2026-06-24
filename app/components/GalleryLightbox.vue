<script setup lang="ts">
// Split-screen image lightbox. The image is object-contain (zero crop / zero
// distortion — the whole drawing always visible); the side panel carries the
// title and an optional explanatory paragraph. Closes on X, backdrop click or Esc.
const { t } = useI18n()

interface Item { src: string, title: string, text?: string }

const props = defineProps<{
  items: Item[]
  // index of the open image, or -1 when closed
  modelValue: number
}>()
const emit = defineEmits<{ 'update:modelValue': [number] }>()

const open = computed(() => props.modelValue >= 0 && props.modelValue < props.items.length)
const current = computed(() => props.items[props.modelValue])

const close = () => emit('update:modelValue', -1)
const go = (delta: number) => {
  const n = props.items.length
  if (n > 0) {
    emit('update:modelValue', (props.modelValue + delta + n) % n)
  }
}

const onKey = (e: KeyboardEvent) => {
  if (!open.value) {
    return
  }
  if (e.key === 'Escape') {
    close()
  } else if (e.key === 'ArrowRight') {
    go(1)
  } else if (e.key === 'ArrowLeft') {
    go(-1)
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

// Lock background scroll while the overlay is open.
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open && current"
      class="fixed inset-0 z-50 flex flex-col bg-black/90 lg:flex-row"
      role="dialog"
      aria-modal="true"
    >
      <!-- Image area — clicking the empty space (not the image) closes. -->
      <div
        class="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8"
        @click.self="close"
      >
        <img
          :src="current.src"
          :alt="current.title"
          class="max-h-full max-w-full object-contain"
        >

        <button
          v-if="items.length > 1"
          type="button"
          class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          :aria-label="t('prev')"
          @click.stop="go(-1)"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-6"
          />
        </button>
        <button
          v-if="items.length > 1"
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          :aria-label="t('next')"
          @click.stop="go(1)"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-6"
          />
        </button>
      </div>

      <!-- Side panel: stacks below on mobile, fixed column on desktop. -->
      <aside class="w-full shrink-0 overflow-y-auto border-t border-white/15 bg-neutral-950 p-6 text-white sm:p-8 lg:w-96 lg:border-l lg:border-t-0">
        <h3 class="font-serif text-xl">
          {{ current.title }}
        </h3>
        <p
          v-if="current.text"
          class="mt-3 text-sm leading-relaxed text-white/70"
        >
          {{ current.text }}
        </p>
      </aside>

      <button
        type="button"
        class="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        :aria-label="t('close')"
        @click="close"
      >
        <UIcon
          name="i-lucide-x"
          class="size-6"
        />
      </button>
    </div>
  </Teleport>
</template>

<i18n lang="json">
{
  "en": {
    "close": "Close",
    "prev": "Previous image",
    "next": "Next image"
  },
  "fr": {
    "close": "Fermer",
    "prev": "Image précédente",
    "next": "Image suivante"
  }
}
</i18n>
