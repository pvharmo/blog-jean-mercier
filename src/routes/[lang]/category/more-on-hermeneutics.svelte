<script context="module">
    export async function preload({ params: {lang} }) {
      await fetchCategories(this, lang);
      await fetchTags(this, lang);
    }
  </script>
  
  <script>
    import { stores } from "@sapper/app";
    import t from "../../../locales/language";
  
    import { moreOnHermeneutics } from "../../../stores";
    import { fetchCategories, fetchTags } from "../../../actions";
    import { getLang } from "../../../utils";
  
    import PostsGrid from "../../../components/PostsGrid.svelte";
  
    const { page } = stores();
  
    $: filteredPosts = $moreOnHermeneutics
  
    $: lang = getLang($page.path);
  </script>
  
  <svelte:head>
    <title>{t(lang).sidebar["More on hermeneutics"]}</title>
  </svelte:head>
  
  <div id="posts-by-category-page" class="page-wrapper home-page">
    <h1 class="title" style="text-align: center">{t(lang).sidebar["More on hermeneutics"]}</h1>
    <PostsGrid posts={filteredPosts} {lang} />
  </div>