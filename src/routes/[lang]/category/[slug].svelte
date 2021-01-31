<!-- <script context="module">
  export function preload(page) {
    const { slug } = page.params;
    return { slug };
  }
</script> -->

<script context="module">
  export async function preload({ params: {lang} }) {
    await fetchCategories(this, lang);
    await fetchTags(this, lang);
  }
</script>

<script>
  import { stores } from "@sapper/app";

  import { posts, categories } from "../../../stores";
  import { fetchCategories, fetchTags } from "../../../actions";
  import { getLang } from "../../../utils";

  import PostsGrid from "../../../components/PostsGrid.svelte";

  const { page } = stores();

  $: category = $categories.find((x) => {
    return x.slug === $page.params.slug;
  });

  $: filteredPosts = filterPosts($posts);
  
  function filterPosts(posts) {
    const filteredPosts = posts.filter((x) => {
      return x.category.includes(category.name);
    });
    return filteredPosts;
  };

  $: lang = getLang($page.path);
</script>

<svelte:head>
  <title>{category.name}</title>
</svelte:head>

<div id="posts-by-category-page" class="page-wrapper home-page">
  <h1 class="title" style="text-align: center">{category.name}</h1>
  <PostsGrid posts={filteredPosts} {lang} />
</div>
