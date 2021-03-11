<script context="module">
    export async function preload({ params: {lang} }) {
      await fetchCategories(this, lang);
      await fetchTags(this, lang);
    }
  </script>
  
  <script>
    import { stores } from "@sapper/app";
    import t from "../../../locales/language";
  
    import { bulletComments } from "../../../stores";
    import { fetchCategories, fetchTags } from "../../../actions";
    import { getLang } from "../../../utils";
  
    import PostsGrid from "../../../components/PostsGrid.svelte";
  
    const { page } = stores();
  
    $: filteredPosts = $bulletComments
  
    $: lang = getLang($page.path);
  </script>
  
  <svelte:head>
    <title>{t(lang).sidebar["Bullet comments"]}</title>
  </svelte:head>
  
  <div id="posts-by-category-page" class="page-wrapper home-page">
    <h1 class="title" style="text-align: center">{t(lang).sidebar["Bullet comments"]}</h1>
    <PostsGrid posts={filteredPosts} {lang} />
  </div>
  