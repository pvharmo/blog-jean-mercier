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
  import { onDestroy } from "svelte";
  import { stores } from "@sapper/app";

  import { filteredPosts as postsStore, categories } from "../../../stores";
  import { fetchCategories, fetchTags } from "../../../actions";

  import PostsGrid from "../../../components/PostsGrid.svelte";

  const { page } = stores();

  let posts = [];

  const category = $categories.find((x) => {
    return x.slug === $page.params.slug;
  });

  let filterPosts = (posts) => {
    const filteredPosts = posts.filter((x) => {
      return x.category.includes(category.name);
    });
    return filteredPosts;
  };

  const unsubscribe = postsStore.subscribe((value) => {
    posts = filterPosts(value);
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{category.name}</title>
</svelte:head>

<div id="posts-by-category-page" class="page-wrapper home-page">
  <h1 class="title" style="text-align: center">{category.name}</h1>
  <PostsGrid {posts} />
</div>
