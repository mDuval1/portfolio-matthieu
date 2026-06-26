// Client-only micro-interactions for the "Sartorial Rigor" feel:
//   • scroll reveal (fade-in + slide-up via IntersectionObserver)
//   • custom minimalist cursor (mix-blend dot, swells over interactive elements)
//   • magnetic header links (slight pull toward the cursor)
//   • light hero parallax ([data-parallax] elements)
//
// All are progressive enhancement and fully gated: reduced-motion users get none
// of the motion (and reveal targets stay visible), and the cursor + magnetic
// effects only run on fine pointers (mouse), never on touch. Listeners are passive
// and all work happens inside requestAnimationFrame, so scrolling stays smooth.
export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  const root = document.documentElement

  // ---------- scroll reveal ----------
  let io: IntersectionObserver | undefined
  const seen = new WeakSet<Element>()

  if (!reduced && 'IntersectionObserver' in window) {
    // Marking <html> hides the start state (see main.css); coupling it with the
    // observer means content can never get stuck invisible if this never runs.
    root.classList.add('js-anim')
    io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io?.unobserve(entry.target)
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 })
  }

  // True when any part of the element is within the viewport.
  const inViewport = (el: Element) => {
    const r = el.getBoundingClientRect()
    return r.bottom > 0 && r.top < window.innerHeight && r.width > 0
  }

  const scanReveal = () => {
    if (!io) {
      return
    }
    for (const el of document.querySelectorAll('.reveal')) {
      if (seen.has(el)) {
        continue
      }
      seen.add(el)
      if (inViewport(el)) {
        // Already on screen (e.g. above the fold right after a route change):
        // reveal it now instead of waiting on the observer. This sidesteps the
        // out-in page-transition race where the observer could miss freshly
        // mounted nodes and leave cards/images stuck at opacity 0.
        el.classList.add('is-visible')
      } else {
        io.observe(el)
      }
    }
  }

  // Failsafe: reveal anything on screen that is still hidden, so a route-change
  // race can never trap content at opacity 0. In-viewport only — below-fold
  // elements keep their scroll-triggered reveal.
  const revealVisible = () => {
    for (const el of document.querySelectorAll('.reveal:not(.is-visible)')) {
      if (inViewport(el)) {
        el.classList.add('is-visible')
      }
    }
  }

  // ---------- hero parallax ----------
  let parallaxEls: HTMLElement[] = []
  let scrollQueued = false

  const renderParallax = () => {
    const y = window.scrollY
    for (const el of parallaxEls) {
      const factor = Number.parseFloat(el.dataset.parallax || '0.06')
      el.style.transform = `translate3d(0, ${(y * factor).toFixed(2)}px, 0)`
    }
    scrollQueued = false
  }

  const onScroll = () => {
    if (!scrollQueued) {
      scrollQueued = true
      requestAnimationFrame(renderParallax)
    }
  }

  const scanParallax = () => {
    if (reduced) {
      return
    }
    parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    renderParallax()
  }

  // ---------- custom cursor ----------
  const initCursor = () => {
    if (!fine || reduced) {
      return
    }
    const dot = document.createElement('div')
    dot.id = 'cursor-dot'
    dot.style.opacity = '0'
    const disc = document.createElement('span')
    disc.className = 'cursor-disc'
    dot.appendChild(disc)
    document.body.appendChild(dot)
    root.classList.add('has-custom-cursor')

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let curX = targetX
    let curY = targetY

    const loop = () => {
      curX += (targetX - curX) * 0.2
      curY += (targetY - curY) * 0.2
      dot.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX
      targetY = e.clientY
      dot.style.opacity = '1'
    }, { passive: true })
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'
    })

    const interactive = 'a, button, [role="button"], input, label, summary'
    document.addEventListener('mouseover', (e) => {
      if ((e.target as Element)?.closest?.(interactive)) {
        dot.classList.add('is-hover')
      }
    }, { passive: true })
    document.addEventListener('mouseout', (e) => {
      if ((e.target as Element)?.closest?.(interactive)) {
        dot.classList.remove('is-hover')
      }
    }, { passive: true })
  }

  // ---------- magnetic header links ----------
  const initMagnetic = () => {
    if (!fine || reduced) {
      return
    }
    for (const link of document.querySelectorAll<HTMLElement>('header a')) {
      if (link.dataset.magnetic) {
        continue
      }
      link.dataset.magnetic = '1'
      link.addEventListener('mousemove', (e) => {
        const r = link.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.3
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.4
        link.style.transition = 'transform 0s'
        link.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
      })
      link.addEventListener('mouseleave', () => {
        link.style.transition = 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)'
        link.style.transform = ''
      })
    }
  }

  if (!reduced) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  // Called directly (no rAF wrapper): the hooks below already fire once the DOM is
  // mounted and settled, and rAF is paused in hidden tabs — so depending on it could
  // delay the reveal indefinitely. scanReveal reveals in-viewport targets synchronously.
  const refresh = () => {
    scanReveal()
    scanParallax()
    initMagnetic()
  }

  // If the tab was hidden during navigation, rAF (and thus the native page
  // transition) is paused; re-scan and reveal on return so nothing is left hidden.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      refresh()
      revealVisible()
    }
  })

  nuxtApp.hook('app:mounted', () => {
    initCursor()
    refresh()
  })
  // With out-in transitions the incoming page is only inserted once the outgoing
  // one has left, so `page:finish` fires *before* the new page's DOM exists. Re-scan
  // on `page:transition:finish` instead — by then the new page is mounted, painted
  // and settled — so reveal/parallax targets are reliably found after SPA navigation.
  nuxtApp.hook('page:transition:finish', refresh)
  // Belt-and-suspenders: also scan just after the page resolves (covers any case
  // where the transition hook is skipped, e.g. transitions disabled), and force a
  // reveal of on-screen elements a beat later so nothing can stay invisible.
  nuxtApp.hook('page:finish', () => {
    setTimeout(refresh, 50)
    setTimeout(revealVisible, 1200)
  })
})
