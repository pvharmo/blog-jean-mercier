<script>
  import { lang } from "../stores";
  import Faq_fr from "../locales/fr/Faq.svelte";
  import Faq_en from "../locales/en/Faq.svelte";
</script>

<svelte:head>
  <title>FAQ</title>
</svelte:head>

<div id="about-page" class="page-wrapper about-page content-page">
  <div class="content">
    {#if $lang == "fr"}
      <Faq_fr />
    {:else}
      <Faq_en />
    {/if}
  </div>
</div>
