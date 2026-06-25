// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Build/codegen tooling (Node scripts) — not part of the app bundle, not linted.
  { ignores: ['scripts/**'] }
)
