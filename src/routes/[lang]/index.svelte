<script context="module">
  export async function preload({ params: {lang} }) {
    await fetchCategories(this, lang);
    await fetchTags(this, lang);
  }
</script>

<script>
  import { onMount } from "svelte";
  import { posts } from "../../stores";
  import PostsGrid from "../../components/PostsGrid.svelte";
  import t from "../../locales/language";
  import { stores } from "@sapper/app";
  import { getLang } from "../../utils";
  import { fetchCategories, fetchTags } from "../../actions";

  const { page } = stores();

  $: lang = getLang($page.path);

  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  });
</script>

<svelte:head>
  <title>{t(lang).home} | {t(lang).siteName}</title>
  <!-- <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script> -->
</svelte:head>

<div id="home-page" class="page-wrapper home-page">
  <PostsGrid posts={$posts} lang={lang} />
</div>
