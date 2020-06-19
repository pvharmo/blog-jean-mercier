<template>
  <div id="categories-page" class="page-wrapper categories-page">
    <categories-grid />
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: `Categories | ${this.$siteConfig.siteName}`
    }
  }
}
</script>
