<template>
  <section :class="`hero is-medium hero-theme-${computedTheme}`">
    <div class="hero-body">
      <nuxt-link to="/">
        <div class="container">
          <img
            class="hero-bg-img"
            :src="responsiveImage.src"
            :lazy="false"
            :srcset="responsiveImage.srcSet"
          />
          <h1 class="title animated fadeInUp">
            {{ this.$siteConfig.siteName }}
          </h1>
          <h2 class="subtitle animated fadeInUp slower">
            {{ this.$siteConfig.tagline }}
          </h2>
          <br />
          <div
            v-if="$slots.default"
            class="under-subtitle animated fadeInDown slower"
          >
            <slot />
          </div>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SiteHero',
  computed: {
    responsiveImage() {
      return { src: this.$siteConfig.featureImage, srcSet: '' }
    },
    computedTheme() {
      return this.$siteConfig.hero.theme || 'mist'
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-size: cover !important;
  background-position: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.title {
  color: #666;
  font-weight: 300;
  @media (min-width: 768px) {
    font-size: 27px;
    font-family: 'Roboto Slab', Georgia, Times, serif;
  }
}
.subtitle,
.under-subtitle {
  color: #999;
  padding: 0;
  margin: 0;
}
.subtitle {
  font-weight: 300;
  font-size: 1rem;
  margin-bottom: 0 !important;
  margin-top: -10px !important;
}
.under-subtitle {
  display: inline-block;
  font-size: 0.8rem;
  border-top: 2px solid $primary;
  padding-top: 5px;
}
.opti-image {
  opacity: 0;
}
.opti-image-loaded {
  opacity: 0.12;
  animation: blurIn 4.5s ease;
}
</style>
<style lang="scss">
.hero {
  .hero-bg-img {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // object-fit: cover;
    height: 600px;
    // height: 100%;
  }
  .opti-image {
    opacity: 0;
  }
  .opti-image-loaded {
    opacity: 1;
  }
}
.hero-theme-mist {
  .hero-bg-img {
    filter: grayscale(1);
  }
  .opti-image-loaded {
    opacity: 0.12;
    animation: blurInGrayscale 4.5s ease;
  }
}
.hero-theme-dark,
.hero-theme-light {
  &.hero:after {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    position: absolute;
  }
  .hero-body {
    position: relative;
    z-index: 2;
  }
}
.hero-theme-dark {
  .title,
  .subtitle,
  .under-subtitle,
  .under-subtitle strong {
    color: white;
  }
}
.hero-theme-light.hero {
  &:after {
    background: rgba(255, 255, 255, 0.6);
  }
  .title,
  .subtitle,
  .under-subtitle,
  .under-subtitle strong {
    text-shadow: 1px 1px 2px white;
  }
}
.hero-body {
  padding-top: 0;
  padding-bottom: 3px !important;
}
</style>
