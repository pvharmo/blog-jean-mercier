<script context="module">
  export async function preload({ params: {lang} }) {
    await fetchCategories(this, lang);
    await fetchTags(this, lang);
  }
</script>

<script>
  import About_fr from "../../locales/fr/About.svelte";
  import About_en from "../../locales/en/About.svelte";
  import t from "../../locales/language";
  import { stores } from "@sapper/app";
  import { getLang } from "../../utils";
  import { fetchCategories, fetchTags } from "../../actions";

  const { page } = stores();

  $: lang = getLang($page.path);
</script>

<svelte:head>
  <title>{t(lang).about}</title>
</svelte:head>
<div id="about-page" class="page-wrapper about-page content-page">
  <div class="content">
    {#if lang == "fr"}
      <About_fr />
    {:else}
      <About_en />
    {/if}
  </div>
</div>
