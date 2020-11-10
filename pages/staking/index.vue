<template>
  <page-template>
    <h1 class="text-h4 mb-4">Staking</h1>
    <validator-list />
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import ValidatorList from '@/components/ValidatorList'

export default {
  head() {
    const title = `Staking`

    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  components: {
    PageTemplate,
    ValidatorList
  }
}
</script>
