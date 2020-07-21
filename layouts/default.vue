<template>
  <div
    :class="
      `site-layout-width-${$siteConfig.layout.width} posts-theme-${$siteConfig.posts.theme}`
    "
  >
    <site-hero
      title="Un éléphant dans la pièce"
      subtitle="Un blogue sur le sens caché des films contemporains"
      image="/elephant-logo.png"
    >
    </site-hero>
    <site-nav />
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <!-- All Posts -->
        <nuxt />
      </template>
      <template v-slot:sidebar>
        <div class="content">
          <h3>
            John the Mercer
          </h3>
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
            The Elephants Behind The Screen
          </h3>
          <ul class="categories-menu">
            <li v-for="cat in elephantBehindTheScreen" :key="cat.slug">
              <nuxt-link :to="`/categories/${cat.slug}`">
                {{ cat.name }}
              </nuxt-link>
            </li>
          </ul>
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
  data() {
    return {
      allCats: [],
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
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
  async created() {
    this.$cms.lifeCycleHooks.created()
    this.allCats = await this.$cms.category.getAll()
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
