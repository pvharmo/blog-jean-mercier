<template>
  <div id="contact-page" class="page-wrapper contact-page content-page">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">
            Hello!
          </p>
          <p class="subtitle">
            What can I do for you?
          </p>
          <figure class="image is-1by1 ">
            <opti-image
              :src="require('~/assets/uploads/contact-person.jpg').src"
              :srcset="require('~/assets/uploads/contact-person.jpg').srcSet"
            />
          </figure>
          <br />
          <div class="content">
            <p>
              <strong>
                Edit this page in<code>/pages/contact.vue</code>to fit your
                needs.
              </strong>
            </p>
            <p>
              This form doesn't actually work but would be easy enough to slap
              an action on to have it post wherever you'd like. Or put the
              netlify attribute on it and have netlify handle all your form
              submissions...
            </p>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-8">
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
