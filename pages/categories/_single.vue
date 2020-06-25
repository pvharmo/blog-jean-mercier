<template>
  <div id="category-page" class="page-wrapper category-page">
    <!-- Posts in Category -->
    <posts-grid :posts="posts" :category="[$store.state.name]" :per-row="2" />
  </div>
</template>
<script>
export default {
  computed: {
    posts() {
      let filteredPosts = []
      const category = this.$store.state.categories.find(
        (x) => x.slug === this.$route.params.single
      )
      if (category) {
        filteredPosts = this.$store.state.posts.filter((x) => {
          return x.category.includes(category.name)
        })
      }
      return filteredPosts
    }
  }
}
</script>
