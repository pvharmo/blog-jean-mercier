<script>
  import { onDestroy } from "svelte";
  import { filteredPosts as postsStore, lang } from "../stores";
  import PostsGrid from "../components/PostsGrid.svelte";
  import t from "../locales/language";
  import { onMount } from "svelte";

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
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<div id="home-page" class="page-wrapper home-page">
  <PostsGrid {posts} />
</div>
