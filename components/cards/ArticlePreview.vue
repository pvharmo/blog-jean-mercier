<template>
  <div class="content">
    <intersection-observer @view="load" />
    <nuxt-link :to="'/' + post.slug">
      <h1>{{ post.title }}</h1>
      <p class="publish-infos">{{ datePretty }}</p>
    </nuxt-link>
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
    <p class="excerpt">
      {{ post.excerpt }}
    </p>
    <nuxt-link :to="'/' + post.slug">Read more</nuxt-link>
  </div>
</template>

<script>
import { getFormattedDate } from '~/helper'
const imageDimensionDefault = '16x9'
export default {
  props: {
    post: { type: Object, default: () => {} },
    imageDimensions: { type: String, default: imageDimensionDefault }
  },
  computed: {
    datePretty() {
      return getFormattedDate(this.post.date)
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
      if (this.post.featureImage.indexOf('/uploads') === 0) {
        return require(`~/assets${this.post.featureImage}`)
      }
      return { src: this.post.featureImage, srcSet: '' }
    }
  },
  methods: {
    load() {
      this.$store.dispatch('loadPostContent', this.post.slug)
    }
  }
}
</script>
<style>
.movie-feature {
  margin-bottom: 18px;
  margin-top: 18px;
}

.publish-infos {
  color: #999;
  font-size: 12px;
  text-transform: uppercase;
}
</style>
