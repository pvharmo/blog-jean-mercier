<template>
  <div id="post-page" class="page-wrapper post-page">
    <div class="post-wrapper content">
      <h1>{{ post.title }}</h1>
      <div class="movie-feature">
        <youtube-media
          v-if="post.youtubeMovieTrailer"
          class="movie-trailer"
          :video-id="post.youtubeMovieTrailer"
          :player-height="340"
        ></youtube-media>
        <opti-image
          v-else-if="post.featureImage"
          :src="responsiveImage.src"
          :srcset="responsiveImage.srcSet"
          :width="imageRatio[0]"
          :height="imageRatio[1]"
          :sizes="`(min-width: 768px) ${100 / $siteConfig.posts.perRow}vw`"
        />
      </div>
      <div>
        <span>Categories :</span>
        <v-chip
          v-for="category in post.category"
          :key="category"
          style="margin: 5px;"
          :to="catSlug(category)"
          nuxt
        >
          {{ category }}
        </v-chip>
      </div>
      <div>
        <span>Tags :</span>
        <v-chip
          v-for="tag in post.tags"
          :key="tag"
          style="margin: 5px;"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </v-chip>
      </div>
      <p v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</p>
      <markdown :markdown="post.content" />
      <disqus-comments :identifier="$route.params.singlePost" />
    </div>
  </div>
</template>
<script>
import { getFormattedDate } from '../helper'
import Markdown from '~/components/Markdown'
const imageDimensionDefault = '16x9'

export default {
  components: {
    Markdown
  },
  async asyncData({ app, store, route }) {
    const postIndex = store.state.posts.findIndex(
      (x) => x.slug === route.params.singlePost
    )
    const slug = store.state.posts[postIndex].slug
    const lang = app.i18n.locale
    await store.dispatch('loadPostContent', { slug, lang })
    return { postIndex }
  },
  computed: {
    post() {
      const post = this.$store.state.posts[this.postIndex]
      if (!post.content) {
        post.content = ''
      }
      return post
    },
    date() {
      return getFormattedDate(this.$store.state.date)
    },
    url() {
      return `${process.env.URL}/${this.$route.fullPath}`
    },
    imageRatioClass() {
      const imageDimensions = this.imageDimensions || imageDimensionDefault
      return imageDimensions.toLowerCase().replace('x', 'by')
    },
    imageRatio() {
      const imageDimensions = this.imageDimensions || imageDimensionDefault
      return imageDimensions
        .toLowerCase()
        .split('x')
        .map((size) => {
          return size * 2000
        })
    },
    responsiveImage() {
      if (this.featureImage.indexOf('/uploads') === 0) {
        return require(`~/assets${this.featureImage}`)
      }
      return { src: this.featureImage, srcSet: '' }
    }
  },
  methods: {
    catSlug(cat) {
      const categoryObject = this.$store.state.categories.find((x) => {
        return cat === x.name
      })
      return '/categories/' + categoryObject.slug
    },
    selectTag(tag) {
      const tagObject = this.$store.state.tags.find((x) => {
        return tag === x.name
      })
      if (tagObject.type === 'Region') {
        this.$store.dispatch('selectRegion', tag)
        this.$store.dispatch('selectGenre', '')
      } else {
        this.$store.dispatch('selectGenre', tag)
        this.$store.dispatch('selectRegion', '')
      }
      this.$router.push('/')
    }
  }
}
</script>
<style scoped lang="scss">
.edit-post {
  margin-bottom: 20px;
}

.movie-feature {
  margin-bottom: 20px;
}

.excerpt {
  background: #f9f9f9;
  border-right: 10px solid #ccc;
  margin: 1.5em 0;
  padding: 0.5em 10px;
}
</style>
