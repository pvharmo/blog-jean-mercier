<script context="module">
  export async function preload({ params: {lang} }) {
    await fetchCategories(this, lang);
    await fetchTags(this, lang);
  }
</script>

<script>
  import Hermeneutics_fr from "../../locales/fr/Hermeneutics.svelte";
  import Hermeneutics_en from "../../locales/en/Hermeneutics.svelte";
  import t from "../../locales/language";
  import { stores } from "@sapper/app";
  import { getLang } from "../../utils";
  import { fetchCategories, fetchTags } from "../../actions";

  const { page } = stores();

  $: lang = getLang($page.path);
</script>

<svelte:head>
  <title>{t(lang).hermeneutics}</title>
</svelte:head>

<div id="about-page" class="page-wrapper about-page content-page">
  <div class="content">
    {#if lang == "fr"}
      <Hermeneutics_fr />
    {:else}
      <Hermeneutics_en />
    {/if}
  </div>
</div>
