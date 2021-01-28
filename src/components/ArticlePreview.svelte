<script>
  import { onMount } from "svelte";
  import { fetchArticle } from "../actions";
  import { selectedRegion, selectedGenre, tags } from "../stores";
  import Youtube from "./Youtube.svelte";
  import Chip from "./Chip.svelte";
  import { stores } from "@sapper/app";
  import { getLang } from "../utils";

  const { page } = stores();

  $: lang = getLang($page.path);

  export let post;

  $: isSelected = (tag) => {
    return tag === $selectedRegion || tag === $selectedGenre;
  };

  let loadContent = (entries) => {
    entries.forEach(async (element) => {
      if (element.isIntersecting) {
        post = await fetchArticle(post, lang);
      }
    });
  };

  let selectTag = (tag) => {
    const tagObject = $tags.find((x) => {
      return tag === x.name;
    });

    switch (tagObject.type) {
      case "Region":
        selectedRegion.set(tag);
        break;
      case "Genre":
        selectedGenre.set(tag);
        break;

      default:
        break;
    }
  };

  onMount(() => {
    let observer = new IntersectionObserver(loadContent);
    let articleHTML = document.getElementById("article-" + post.slug);
    observer.observe(articleHTML);
  });

  function date() {
    return "";
  }

  if (!post.tag) {
    post.tag = [];
  }
  if (!post.category) {
    post.category = [];
  }
  if (!post.excerpt) {
    post.excerpt = "";
  }
</script>

<div class="content" id="article-{post.slug}">
  <a href="/{lang}/post/{post.slug}">
    <h1>{post.title}</h1>
    <p class="publish-infos">{date()}</p>
  </a>
  {#if post.loaded}
    <div class="movie-feature">
      <Youtube class="movie-trailer" videoId={post.youtubeMovieTrailer} />
    </div>
    <div class="chips-group">
      <span>Categories :</span>
      {#each post.category as category}
        <Chip>{category}</Chip>
      {/each}
    </div>
    <div class="chips-group">
      <span>Tags :</span>
      {#each post.tags as tag}
        <Chip
          active={isSelected(tag)}
          style="margin: 5px;"
          on:click={() => selectTag(tag)}
        >
          {tag}
        </Chip>
      {/each}
    </div>
    <p class="excerpt">{post.excerpt}</p>
  {/if}
  <a href="/{lang}/post/{post.slug}">Read more</a>
</div>

<style>
  .chips-group {
    padding: 5px 0;
  }
</style>
