<script>
  import { onDestroy, onMount } from "svelte";
  import { filteredPosts as postsStore } from "../../stores";
  import PostsGrid from "../../components/PostsGrid.svelte";
  import t from "../../locales/language";
  import { stores } from "@sapper/app";
  import { getLang } from "../../utils";

  const { page } = stores();

  const lang = getLang($page.path);

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
  <title>{t(lang).home} | {t(lang).siteName}</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<div id="home-page" class="page-wrapper home-page">
  <PostsGrid {posts} />
</div>
