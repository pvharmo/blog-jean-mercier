<template>
  <div id="home-page" class="page-wrapper home-page">
    <posts-grid :per-row="1" />
    <news-letter-form-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setPageData } from '../helper'
import NewsLetterFormModal from '~/components/NewsLetterFormModal'

export default {
  name: 'HomePage',
  components: {
    NewsLetterFormModal
  },
  fetch({ store }) {
    setPageData(store, { slug: 'home' })
  },
  data() {
    return {
      allCats: []
    }
  },
  computed: {
    ...mapState(['title', 'subtitle', 'featureImage'])
  },
  async created() {
    this.allCats = await this.$cms.category.getAll()
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
