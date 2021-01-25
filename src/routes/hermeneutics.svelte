<script>
  import { lang } from "../stores";
  import Hermeneutics_fr from "../locales/fr/Hermeneutics.svelte";
  import Hermeneutics_en from "../locales/en/Hermeneutics.svelte";
  import t from "../locales/language";
</script>

<svelte:head>
  <title>{t($lang).hermeneutics}</title>
</svelte:head>

<div id="about-page" class="page-wrapper about-page content-page">
  <div class="content">
    {#if $lang == "fr"}
      <Hermeneutics_fr />
    {:else}
      <Hermeneutics_en />
    {/if}
  </div>
</div>
