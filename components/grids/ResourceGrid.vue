<template>
  <div>
    <div v-if="firstPageLoaded && !resources.length">
      No {{ resourceController.plural.toLowerCase() }} available
    </div>
    <presentational-grid
      v-else
      :items="resources"
      :bottom-loader="!allLoaded && firstPageLoaded"
      :theme="theme"
      :per-row="perRow"
    >
      <template v-slot:default="{ item }">
        <slot :item="item"></slot>
      </template>
    </presentational-grid>
  </div>
</template>

<script>
import { isString } from 'lodash'
import PresentationalGrid from './PresentationalGrid'

export default {
  name: 'ResourceGrid',
  components: { PresentationalGrid },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    resource: { required: true },
    theme: { type: String, default: 'blocks' },
    perRow: { type: Number, default: 3 },
    number: { type: Number, default: 1 },
    order: { type: String, default: 'DESC' },
    category: {
      type: Array,
      default() {
        return []
      }
    },
    tags: {
      type: Array,
      default() {
        return []
      }
    },
    exclude: { type: String, default: '' },
    resources: { type: Array, default: () => [] }
  },
  data() {
    return {
      allLoaded: false,
      firstPageLoaded: false,
      page: 0,
      allPostsLoaded: false,
      loading: false
    }
  },
  computed: {
    resourceController() {
      return isString(this.resource) ? this.$cms[this.resource] : this.resource
    }
  },
  created() {
    this.$eventBus.$on('route-changed', this.reset)
  },
  destroyed() {
    this.$eventBus.$off('route-changed', this.reset)
  },
  methods: {
    reset() {
      this.resourceController.reset()
      this.page = 0
      this.allLoaded = false
      this.firstPageLoaded = false
      this.loading = false
    },
    loadMore() {
      if (this.loading) {
        return
      }
      if (!this.firstPageLoaded) {
        this.reset()
      }
      if (!this.allLoaded) {
        this.page++
        this.addResources()
      }
    },
    async addResources() {
      this.loading = true
      await this.$store.dispatch('loadNextPosts', {
        prePage: this.number,
        page: this.page
      })
      this.allLoaded = true

      if (!this.firstPageLoaded) {
        this.firstPageLoaded = true
      }
      this.loading = false
    },
    resourceFilters(resource) {
      // if (this.exclude && this.category.length) {
      //   if (Array.isArray(this.category)) {
      //     return (
      //       resource.category.some((cat) => {
      //         return this.category.includes(cat)
      //       }) && resource.slug !== this.exclude
      //     )
      //   }
      //   return (
      //     resource.category.includes(this.category) &&
      //     resource.slug !== this.exclude
      //   )
      // }
      if (this.category.length) {
        if (Array.isArray(this.category)) {
          return resource.category.some((cat) => {
            return this.category.includes(cat)
          })
        }
        return resource.category.includes(this.category)
      }
      if (this.tags.length) {
        if (Array.isArray(this.tags)) {
          return resource.tags.some((cat) => {
            return this.tags.includes(cat)
          })
        }
        return resource.tags.includes(this.tags)
      }
      // if (this.exclude) {
      //   return resource.slug !== this.exclude
      // }
      return resource
    }
  }
}
</script>
