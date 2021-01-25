<template>
  <nav role="navigation" aria-label="main navigation">
    <div
      :class="{
        'navbar-menu': true,
        'is-active': active
      }"
    >
      <ul class="navbar-end navbar-center">
        <li
          v-for="item in $siteConfig.mainMenu"
          :key="item.link"
          class="navbar-item"
          @click="active = false"
        >
          <component
            :is="item.link.startsWith('http') ? 'a' : 'nuxt-link'"
            :href="item.link"
            :to="item.link"
            :target="item.target ? item.target : '_self'"
          >
            {{ item.name }}
          </component>
        </li>
        <li class="navbar-item">
          <nuxt-link v-if="$i18n.locale == 'en'" :to="switchLocalePath('fr')">
            FRANÇAIS
          </nuxt-link>
          <nuxt-link v-else-if="$i18n.locale == 'fr'" :to="switchLocalePath('en')">
            ENGLISH
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import HamburgerButton from '~/components/HamburgerButton'
export default {
  name: 'SiteNav',
  components: { HamburgerButton },
  data() {
    return {
      active: false
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-item img {
  max-height: 2rem;
}
.site-search-wrapper {
  transform: translateX(5px);
  @media (max-width: 1023px) {
    display: none;
  }
}
.navbar-burger {
  height: auto;
}

.navbar-menu a {
  display: block;
}

.navbar-center {
  margin-right: auto;
}

.navbar-menu {
  max-width: 937px;
  margin: auto;
  border-color: #eee;
  border-width: 3px;
  border-style: solid none;
  padding: 27px;
}

.navbar-menu a {
  font-size: 13px;
  font-family: 'Quattrocento Sans';
  color: #999;
  transition: all 0.2s ease-in-out;
}

.navbar-menu a:hover {
  color: #1c7c7c;
}
</style>
