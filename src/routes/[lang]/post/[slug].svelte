<script context="module">
  export async function preload({ params : { slug, lang } }) {
    const post = await fetchArticleContent(this, slug, lang);
    return { post, lang };
  }
</script>

<script>
  import {
    selectedRegion,
    selectedGenre,
    tags,
    categories,
  } from "../../../stores";
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";
  import { getLang } from "../../../utils";

  import { fetchCategories, fetchTags, fetchArticleContent } from "../../../actions";

  import Youtube from "../../../components/Youtube.svelte";
  import Chip from "../../../components/Chip.svelte";
  import Markdown from "../../../components/Markdown.svelte";
  import Comments from "../../../components/Disqus.svelte";
  import { onMount } from "svelte";

  const { page } = stores();

  $: lang = getLang($page.path);

  onMount(() => {
    fetchCategories(window, lang);
    fetchTags(window, lang);
  })

  export let post;
  export let lang;

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

  let getEnglishFormattedDate = (date) => {
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

  let getFrenchFormattedDate = (date) => {
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const dateObj = new Date(date);
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  };

  let getFormattedDate = (date) => {
    if (lang === 'fr') {
      return getFrenchFormattedDate(date)
    }
    return getEnglishFormattedDate(date)
  }

  let getCategory = (categoryId, catsObjects) => {
    let cat = catsObjects.find(x => {
      return x.id === categoryId
    })
    if (cat) {
      return cat.name
    }
    return ""
  }

  let getTag = (tagId, tagsObjects) => {
    let tag = tagsObjects.find(x => {
      return x.id === tagId
    })
    if(tag) {
      return tag.name
    }
    return ""
  }
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div id="post-page" class="page-wrapper post-page">
  {#if post}
    <div class="post-wrapper content">
      <h1>{post.title}</h1>
      <p>{getFormattedDate(post.date)}</p>
      <div class="movie-feature">
        <Youtube class="movie-trailer" videoId={post.youtubeMovieTrailer} />
      </div>
      <div>
        <span>Categories :</span>
        {#each post.category as category}
          <Chip style="margin: 5px;" on:click={() => gotoCat(category)}>
            {getCategory(category, $categories)}
          </Chip>
        {/each}
      </div>
      <div>
        <span>Tags :</span>
        {#each post.tags as tag}
          <Chip style="margin: 5px;" on:click={() => selectTag(tag)}>
            {getTag(tag, $tags)}
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
