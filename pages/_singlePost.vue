<template>
  <div id="post-page" class="page-wrapper post-page">
    <div class="post-wrapper">
      <Markdown-text :markdown="$store.state.content" />
      <disqus-comments :identifier="$route.params.singlePost" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { setPageData, getFormattedDate } from '../helper'
// import 'highlight.js/styles/github.css'
import MarkdownText from '~/components/MarkdownText'
export default {
  components: {
    MarkdownText
  },
  fetch({ store, params }) {
    setPageData(store, { resource: 'post', slug: params.singlePost })
  },
  computed: {
    ...mapState([
      'title',
      'subtitle',
      'featureImage',
      'underSubtitle',
      'author',
      'category',
      'slug'
    ]),
    date() {
      return getFormattedDate(this.$store.state.date)
    },
    url() {
      return `${process.env.URL}/${this.$route.fullPath}`
    }
  }
}
</script>
<style scoped lang="scss">
.edit-post {
  margin-bottom: 20px;
}
</style>
