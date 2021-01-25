<script>
  import { lang } from "../stores";
  import About_fr from "../locales/fr/About.svelte";
  import About_en from "../locales/en/About.svelte";
  import t from "../locales/language";
</script>

<svelte:head>
  <title>{t($lang).about}</title>
</svelte:head>
<div id="about-page" class="page-wrapper about-page content-page">
  <div class="content">
    {#if $lang == "fr"}
      <About_fr />
    {:else}
      <About_en />
    {/if}
  </div>
</div>
