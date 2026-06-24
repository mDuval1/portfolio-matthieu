<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()

// Single toggle button: flip straight to the other locale. setLocale() writes the
// i18n_redirected cookie *then* navigates, so the default-locale redirect guard on
// "/" doesn't bounce back (a plain switchLocalePath link left the cookie stale).
const other = computed(() => locales.value.find(l => l.code !== locale.value))
const toggle = () => {
  if (other.value) {
    setLocale(other.value.code)
  }
}
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    :aria-label="t('switch')"
    @click="toggle"
  >
    <span :class="locale === 'fr' ? 'font-semibold text-highlighted' : 'text-dimmed'">FR</span>
    <span class="text-dimmed">/</span>
    <span :class="locale === 'en' ? 'font-semibold text-highlighted' : 'text-dimmed'">EN</span>
  </UButton>
</template>

<i18n lang="json">
{
  "en": {
    "switch": "Change language"
  },
  "fr": {
    "switch": "Changer de langue"
  }
}
</i18n>
