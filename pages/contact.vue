<template>
  <div id="contact-page" class="page-wrapper contact-page content-page">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <contact-form />
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import ContactForm from '~/components/ContactForm'
export default {
  components: { ContactForm },
  head() {
    return {
      title: `Contact | ${this.$siteConfig.siteName}`
    }
  }
}
</script>
