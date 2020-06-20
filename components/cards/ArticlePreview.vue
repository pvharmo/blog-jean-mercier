<template>
  <div class="content">
    <nuxt-link :to="link">
      <h1>{{ title }}</h1>
      <p class="publish-infos">{{ datePretty }}</p>
    </nuxt-link>
    <div class="movie-feature">
      <youtube-media
        v-if="youtubeVideo"
        class="movie-trailer"
        :video-id="youtubeVideo"
        :player-height="340"
      ></youtube-media>
      <opti-image
        v-else-if="image"
        :src="responsiveImage.src"
        :srcset="responsiveImage.srcSet"
        :width="imageRatio[0]"
        :height="imageRatio[1]"
        :sizes="`(min-width: 768px) ${100 / $siteConfig.posts.perRow}vw`"
      />
    </div>
    <p class="excerpt">
      {{ excerpt }}
    </p>
    <nuxt-link :to="link">Read more</nuxt-link>
  </div>
</template>

<script>
import { getFormattedDate } from '~/helper'
const imageDimensionDefault = '16x9'
export default {
  props: {
    youtubeVideo: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    excerpt: {
      type: String,
      default: ''
    },
    imageDimensions: { type: String, default: imageDimensionDefault }
  },
  computed: {
    datePretty() {
      return getFormattedDate(this.date)
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
      if (this.image.indexOf('/uploads') === 0) {
        return require(`~/assets${this.image}`)
      }
      return { src: this.image, srcSet: '' }
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
