<template>
  <div id="tag-page" class="page-wrapper category-page">
    <!-- Posts in Tag -->
    <posts-grid :tag="[$store.state.name]" :per-row="2" />
  </div>
</template>
<script>
import { setPageData } from '../../helper'
export default {
  fetch({ store, params }) {
    setPageData(store, { resource: 'tag', slug: params.single })
  },
  data() {
    return {
      allCats: []
    }
  },
  async created() {
    this.allCats = await this.$cms.category.getAll()
  }
}
</script>
