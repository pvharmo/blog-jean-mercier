<script>
  import { featureImage } from "../config";
  import t from "../locales/language";
  import { stores } from "@sapper/app";
  import { getLang } from "../utils";

  const { page } = stores();

  $: lang = getLang($page.path);
</script>

<section class="hero is-medium hero-theme-light">
  <div class="hero-body">
    <a href={"/" + lang}>
      <div class="container">
        <img
          alt="The Movie Shrink logo"
          class="hero-bg-img"
          src={featureImage}
          lazy="false"
        />
        <h1 class="title animated fadeInUp">{t(lang).siteName}</h1>
        <h2 class="subtitle animated fadeInUp slower">{t(lang).tagline}</h2>
        <br />
        <div class="under-subtitle animated fadeInDown slower">
          <slot />
        </div>
      </div>
    </a>
  </div>
</section>

<style lang="scss" scoped>
  .hero {
    background-size: cover !important;
    background-position: center;
    text-align: center;
    overflow: hidden;
    position: relative;
  }

  .hero.is-medium .hero-body {
    padding-top: 20px;
  }

  .title {
    color: #666;
    font-weight: 300;
    @media (min-width: 768px) {
      font-size: 40px;
      font-family: "Roboto Slab", Georgia, Times, serif;
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
    font-size: 1.5rem;
    margin-bottom: 0 !important;
    margin-top: -10px !important;
  }
  .under-subtitle {
    display: inline-block;
    font-size: 1.1rem;
    border-top: 2px solid #00d1b2;
    padding-top: 5px;
  }

  .hero-bg-img {
    height: 500px;
  }

  .hero-theme-light {
    &.hero:after {
      content: "";
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
  .hero-theme-light.hero {
    &:after {
      background: rgba(255, 255, 255, 0.6);
    }
    .title,
    .subtitle,
    .under-subtitle {
      text-shadow: 1px 1px 2px white;
    }
  }
  .hero-body {
    padding-top: 0;
    padding-bottom: 3px !important;
  }
</style>
