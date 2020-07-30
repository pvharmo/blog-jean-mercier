<template>
  <div
    :class="
      `site-layout-width-${$siteConfig.layout.width} posts-theme-${$siteConfig.posts.theme}`
    "
  >
    <site-hero> </site-hero>
    <site-nav />
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <!-- All Posts -->
        <nuxt />
      </template>
      <template v-slot:sidebar>
        <div class="content">
          <img src="/aristotle-homer.jpg" />
          <p>
            {{ $siteConfig.siteName }} is attempting to intepret and undestand
            complex films, just as Aristotle, laying his hands on a bust of
            Homer, is trying to get an understanding of the poet's texts.
          </p>
          <h3 class="subtitle">
            Chronicles
          </h3>
          <ul class="categories-menu">
            <li v-for="cat in chronicles" :key="cat.slug">
              <nuxt-link :to="`/categories/${cat.slug}`">
                {{ cat.name }}
              </nuxt-link>
            </li>
          </ul>
          <h3 class="subtitle">
            The Shrink's Toolbox
          </h3>
          <ul class="categories-menu">
            <li v-for="cat in elephantBehindTheScreen" :key="cat.slug">
              <nuxt-link :to="`/categories/${cat.slug}`">
                {{ cat.name }}
              </nuxt-link>
            </li>
          </ul>
          <h3 class="subtitle">
            Region
          </h3>
          <v-chip-group column color="#1c7c7c" @change="selectRegion">
            <v-chip v-for="tag in regions" :key="tag.name">
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
          <h3 class="subtitle">
            Genre
          </h3>
          <v-chip-group column color="#1c7c7c" @change="selectGenre">
            <v-chip v-for="tag in genres" :key="tag.name" color="">
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </div>
      </template>
    </main-section>
    <site-footer></site-footer>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'
export default {
  transition: 'slide-fade',
  computed: {
    regions() {
      return this.$store.state.tags.filter((x) => {
        return x.type === 'Region'
      })
    },
    genres() {
      return this.$store.state.tags.filter((x) => {
        return x.type === 'Genre'
      })
    },
    chronicles() {
      return this.$store.state.categories.filter((x) => {
        return x.type === 'Chronicles'
      })
    },
    elephantBehindTheScreen() {
      return this.$store.state.categories.filter((x) => {
        return x.type === 'The elephants behind the Screen'
      })
    }
  },
  watch: {
    $route() {
      this.$eventBus.$emit('route-changed', this.$route)
    }
  },
  mounted() {
    this.$cms.lifeCycleHooks.mounted()
  },
  beforeCreate() {
    this.$cms.lifeCycleHooks.beforeCreate()
  },
  created() {
    this.$cms.lifeCycleHooks.created()
  },
  beforeMount() {
    this.$cms.lifeCycleHooks.beforeMount()
  },
  beforeUpdate() {
    this.$cms.lifeCycleHooks.beforeUpdate()
  },
  updated() {
    this.$cms.lifeCycleHooks.updated()
  },
  beforeDestroy() {
    this.$cms.lifeCycleHooks.beforeDestroy()
  },
  methods: {
    selectGenre(i) {
      if (i || i === 0) {
        this.$store.dispatch('selectGenre', this.genres[i].name)
      } else {
        this.$store.dispatch('selectGenre', '')
      }
    },
    selectRegion(i) {
      if (i || i === 0) {
        this.$store.dispatch('selectRegion', this.regions[i].name)
      } else {
        this.$store.dispatch('selectRegion', '')
      }
    }
  },
  head() {
    return {
      title: `${this.$store.state.title} | ${this.$siteConfig.siteName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$store.state.subtitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$store.state.subtitle
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$store.state.title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$store.state.featureImage
            ? (process.env.URL ? process.env.URL : '') +
              require(`~/assets${this.$store.state.featureImage}`)
            : ''
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: `summary_large_image`
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: this.$siteConfig.siteName
        }
      ]
    }
  },
  destroy() {
    this.$cms.lifeCycleHooks.destroy()
  }
}
</script>

<style scoped>
.content {
  margin-left: 10px;
}
.content h3 {
  font-size: 18px;
}
.content p {
  font-weight: 700;
  font-size: 15px;
  line-height: 31px;
}
.content .subtitle {
  padding-top: 30px;
}

ul {
  margin-left: 0;
}

li {
  list-style: none;
  padding: 6px 0 0;
  margin: 6px 0 0;
  border-top: 1px solid #eee;
}

li a {
  line-height: 31px;
  font-size: 15px;
  color: #1c7c7c;
  transition: all 0.2s ease-in-out;
}
li a:hover {
  color: #666;
}

.newsletter-form {
  padding-top: 10px;
}

.content img {
  width: 85%;
  margin-left: 10px;
}
</style>
