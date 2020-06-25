<template>
  <resource-grid
    v-bind="$props"
    :resources="posts"
    :per-row="perRow"
    :resource="$cms.post"
    :theme="$siteConfig.posts.theme || $siteConfig.cards.theme || null"
  >
    <template v-slot:default="{ item }">
      <article-preview
        :title="item.title"
        :link="item.slug ? `/${item.slug}` : ''"
        :slug="item.slug"
        :image="item.featureImage"
        :author="item.author"
        :date="item.date"
        :excerpt="item.excerpt"
        :youtube-video="item.youtubeMovieTrailer"
      />
    </template>
  </resource-grid>
</template>

<script>
import ArticlePreview from '~/components/cards/ArticlePreview'
export default {
  name: 'PostsGrid',
  components: { ArticlePreview },
  props: {
    posts: { type: Array, default: () => [] },
    perRow: { type: Number, default: 3 },
    number: { type: Number, default: 0 },
    order: { type: String, default: 'DESC' },
    category: {
      type: Array,
      default() {
        return []
      }
    },
    exclude: { type: String, default: '' },
    filter: { type: Boolean, default: false }
  }
}
</script>
