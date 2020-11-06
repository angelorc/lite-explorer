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
  components: {
    PageTemplate,
    ValidatorList,
  },
}
</script>
