<script>
  import { onDestroy } from "svelte";
  import { filteredPosts as postsStore, lang } from "../stores";
  import PostsGrid from "../components/PostsGrid.svelte";
  import t from "../locales/language";

  let posts = [];
  function filterPosts(posts) {
    const filteredPosts = posts.filter((x) => {
      return !(
        x.category.includes("Bullet comments") ||
        x.category.includes("Revisiting classics") ||
        x.category.includes("More on hermeneutics")
      );
    });
    return filteredPosts;
  }

  const unsubscribe = postsStore.subscribe((value) => {
    posts = filterPosts(value);
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{t($lang).home} | {t($lang).siteName}</title>
</svelte:head>

<div id="home-page" class="page-wrapper home-page">
  <PostsGrid {posts} />
</div>
