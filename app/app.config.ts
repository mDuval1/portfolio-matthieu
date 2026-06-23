export default defineAppConfig({
  // Warm earthen palette from the Matthieu Duval design system.
  // Ramps + semantic tokens live in `app/assets/css/main.css`.
  ui: {
    colors: {
      primary: 'clay', // terracotta — primary accent
      secondary: 'sage', // eucalyptus / drafting overlay
      info: 'blueprint', // technical line-work
      neutral: 'sand' // warm paper → ink
    },

    // Square-ish drafting corners + a semibold, lightly-tracked sans label.
    button: {
      slots: {
        base: 'font-semibold tracking-[0.02em]'
      }
    }
  }
})
