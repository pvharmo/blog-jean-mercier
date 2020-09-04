<template>
  <div id="home-page" class="page-wrapper home-page">
    <posts-grid :posts="posts" />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    posts() {
      const filteredPosts = this.$store.state.posts.filter((x) => {
        return !(
          x.category.includes('Bullet comments') ||
          x.category.includes('Revisiting classics') ||
          x.category.includes('More on hermeneutics')
        )
      })
      return filteredPosts
    }
  },
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
