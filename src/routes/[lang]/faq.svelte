<script>
  import Faq_fr from "../../locales/fr/Faq.svelte";
  import Faq_en from "../../locales/en/Faq.svelte";
  import { stores } from "@sapper/app";
  import { getLang } from "../../utils";

  const { page } = stores();

  $: lang = getLang($page.path);
</script>

<svelte:head>
  <title>FAQ</title>
</svelte:head>

<div id="about-page" class="page-wrapper about-page content-page">
  <div class="content">
    {#if lang == "fr"}
      <Faq_fr />
    {:else}
      <Faq_en />
    {/if}
  </div>
</div>
