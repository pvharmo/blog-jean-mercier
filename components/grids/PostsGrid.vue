<template>
  <div>
    <div v-if="!posts.length">
      No post available
    </div>
    <presentational-grid v-else :items="posts">
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
  }
}
</script>
