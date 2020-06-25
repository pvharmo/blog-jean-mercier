<template>
  <div id="home-page" class="page-wrapper home-page">
    <posts-grid :posts="$store.state.posts" />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: `Home | ${this.$siteConfig.siteName}`
    }
  }
}
</script>

<style>
.home-page .under-subtitle {
  border-top: none;
}
</style>
