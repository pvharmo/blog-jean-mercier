<script>
  import ContactForm from "../components/ContactForm.svelte";
  import { lang } from "../stores";
</script>

<svelte:head>
  <title>Contact</title>
</svelte:head>

<div id="contact-page" class="page-wrapper contact-page content-page">
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <ContactForm />
      </article>
    </div>
  </div>
</div>
