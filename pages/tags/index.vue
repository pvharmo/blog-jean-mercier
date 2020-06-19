<template>
  <div id="tags-page" class="page-wrapper categories-page">
    <tags-grid />
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: `Tags | ${this.$siteConfig.siteName}`
    }
  }
}
</script>
