<template>
  <div id="post-page" class="page-wrapper post-page">
    <div class="post-wrapper content">
      <h1>{{ title }}</h1>
      <h3>{{ subtitle }}</h3>
      <div class="movie-feature">
        <youtube-media
          v-if="youtubeMovieTrailer"
          class="movie-trailer"
          :video-id="youtubeMovieTrailer"
          :player-height="340"
        ></youtube-media>
        <opti-image
          v-else-if="featureImage"
          :src="responsiveImage.src"
          :srcset="responsiveImage.srcSet"
          :width="imageRatio[0]"
          :height="imageRatio[1]"
          :sizes="`(min-width: 768px) ${100 / $siteConfig.posts.perRow}vw`"
        />
      </div>
      <p class="excerpt">{{ excerpt }}</p>
      <markdown :markdown="$store.state.content" />
      <disqus-comments :identifier="$route.params.singlePost" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { setPageData, getFormattedDate } from '../helper'
// import 'highlight.js/styles/github.css'
import Markdown from '~/components/Markdown'
const imageDimensionDefault = '16x9'

export default {
  components: {
    Markdown
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
      'slug',
      'youtubeMovieTrailer',
      'excerpt'
    ]),
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
