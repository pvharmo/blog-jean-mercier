<script>
  import {
    selectedRegion,
    selectedGenre,
    tags,
    posts,
    categories,
  } from "../../../stores";
  import { stores, goto } from "@sapper/app";
  import { onMount } from "svelte";

  import { fetchArticle } from "../../../actions";
  import { getLang } from "../../../utils";

  import Youtube from "../../../components/Youtube.svelte";
  import Chip from "../../../components/Chip.svelte";
  import Markdown from "../../../components/Markdown.svelte";
  import Comments from "../../../components/Disqus.svelte";

  const { page } = stores();

  const lang = getLang($page.path);

  $: post = $posts.find((p) => {
    return p.slug == $page.params.slug;
  });

  onMount(async () => {
    post = await fetchArticle(post, lang);
  });

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
    goto("/");
  };

  let gotoCat = (cat) => {
    const categoryObject = $categories.find((x) => {
      return cat === x.name;
    });
    goto("/category/" + categoryObject.slug);
  };

  let getFormattedDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObj = new Date(date);
    return `${
      months[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div id="post-page" class="page-wrapper post-page">
  {#if post && post.loaded}
    <div class="post-wrapper content">
      <h1>{post.title}</h1>
      <div class="movie-feature">
        <Youtube class="movie-trailer" videoId={post.youtubeMovieTrailer} />
      </div>
      <div>
        <span>Categories :</span>
        {#each post.category as category}
          <Chip style="margin: 5px;" on:click={() => gotoCat(category)}>
            {category}
          </Chip>
        {/each}
      </div>
      <div>
        <span>Tags :</span>
        {#each post.tags as tag}
          <Chip style="margin: 5px;" on:click={() => selectTag(tag)}>
            {tag}
          </Chip>
        {/each}
      </div>
      {#if post.excerpt}
        <p class="excerpt">{post.excerpt}</p>
      {/if}
      <Markdown markdown={post.content} />
      {#if process.browser}
        <Comments identifier={post.slug} siteName="themovieshrink" />
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .movie-feature {
    margin-bottom: 20px;
  }

  .excerpt {
    background: #f9f9f9;
    border-right: 10px solid #ccc;
    margin: 1.5em 0;
    padding: 0.5em 10px;
  }
</style>
