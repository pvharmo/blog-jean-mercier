<script>
  import { selectedRegion, selectedGenre, tags, categories } from "../stores";
  import Youtube from "./Youtube.svelte";
  import Chip from "./Chip.svelte";
  import { stores } from "@sapper/app";
  import { getLang } from "../utils";
  import t from "../locales/language";

  const { page } = stores();

  $: lang = getLang($page.path);

  export let post;

  $: isSelected = (tag) => {
    return tag === $selectedRegion || tag === $selectedGenre;
  };

  let selectTag = (tag) => {
    const tagObject = $tags.find((x) => {
      return tag === x.id;
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

  let getCategory = (categoryId) => {
    let cat = $categories.find(x => {
      return x.id === categoryId
    })
    if (cat) {
      return cat.name
    }
    return ""
  }

  let getTag = (tagId) => {
    let tag = $tags.find(x => {
      return x.id === tagId
    })
    if(tag) {
      return tag.name
    }
    return ""
  }
</script>

<div class="content" id="article-{post.slug}">
  <a href="/{lang}/post/{post.slug}">
    <h1>{post.title}</h1>
    <p class="publish-infos">{date()}</p>
  </a>
  <div class="movie-feature">
    <Youtube class="movie-trailer" videoId={post.youtubeMovieTrailer} />
  </div>
  <div class="chips-group">
    <span>Categories :</span>
    {#each post.category as category}
      <Chip>{getCategory(category)}</Chip>
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
        {getTag(tag)}
      </Chip>
    {/each}
  </div>
  <p class="excerpt">{post.excerpt}</p>
  <a href="/{lang}/post/{post.slug}">{t(lang).readMore}</a>
</div>

<style>
  .chips-group {
    padding: 5px 0;
  }
</style>
