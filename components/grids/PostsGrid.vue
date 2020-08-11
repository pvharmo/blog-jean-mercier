<template>
  <div>
    <p
      v-if="this.$store.state.selectedGenre || this.$store.state.selectedRegion"
    >
      Filtered by :
    </p>
    <div class="filter-infos">
      <p v-if="this.$store.state.selectedRegion">
        Region: {{ this.$store.state.selectedRegion }}
      </p>
      <p v-if="this.$store.state.selectedGenre">
        Genre: {{ this.$store.state.selectedGenre }}
      </p>
    </div>
    <div v-if="!posts.length">
      No post available
    </div>
    <presentational-grid v-else :items="filteredPosts">
      <template v-slot:default="{ item }">
        <article-preview :post="item" />
      </template>
    </presentational-grid>
  </div>
</template>

<script>
import PresentationalGrid from './PresentationalGrid'
import ArticlePreview from '~/components/cards/ArticlePreview'
export default {
  name: 'PostsGrid',
  components: { ArticlePreview, PresentationalGrid },
  props: {
    posts: { type: Array, default: () => [] }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((x) => {
        let valid = true
        if (x.tags) {
          if (this.$store.state.selectedRegion) {
            if (!x.tags.includes(this.$store.state.selectedRegion)) {
              valid = false
            }
          }
          if (this.$store.state.selectedGenre) {
            if (!x.tags.includes(this.$store.state.selectedGenre)) {
              valid = false
            }
          }
        } else {
          valid = false
        }
        return valid
      })
    }
  }
}
</script>
