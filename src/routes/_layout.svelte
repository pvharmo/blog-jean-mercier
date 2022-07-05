<script>
  import {
    selectedRegion,
    selectedGenre,
    tags,
    categories,
  } from "../stores";
  import { onMount } from "svelte";
  import t from "../locales/language";
  import MainSection from "../components/MainSection.svelte";
  import Nav from "../components/Nav.svelte";
  import SiteHero from "../components/SiteHero.svelte";
  import SiteFooter from "../components/SiteFooter.svelte";
  import Chip from "../components/Chip.svelte";
  import { stores } from "@sapper/app";
  import { getLang } from "../utils";

  const { page } = stores();

  $: lang = getLang($page.path);

  onMount(() => {
    let langStored = window.localStorage.getItem("lang");
    if (!langStored) {
      langStored = "en";
      window.localStorage.setItem("lang", "en");
    }
  });

  function selectGenre(genre) {
    if (genre == $selectedGenre) {
      selectedGenre.set("");
    } else {
      selectedGenre.set(genre);
    }
  }

  function selectRegion(region) {
    if (region == $selectedRegion) {
      selectedRegion.set("");
    } else {
      selectedRegion.set(region);
    }
  }

  $: isSelectedRegion = (region) => {
    return region === $selectedRegion;
  };

  $: isSelectedGenre = (genre) => {
    return genre === $selectedGenre;
  };

  $: regions = $tags.filter((x) => {
    return x.type === "Region";
  });
  $: genres = $tags.filter((x) => {
    return x.type === "Genre";
  });
  $: elephantBehindTheScreen = $categories.filter((x) => {
    return x.type === "The elephants behind the Screen";
  });
</script>

<svelte:head>
  <link
    data-n-head="1"
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto+Slab&amp;display=swap"
  />
  <link
    data-n-head="1"
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Quattrocento+Sans:wght@400;700&display=swap"
  />
</svelte:head>

<div class="site-layout-width-contained posts-theme-one-column">
  <SiteHero />
  <Nav />
  <MainSection theme="sidebar-right">
    <!-- All Posts -->
    <slot />
    <div class="content" slot="sidebar">
      <img alt="Aristotle" src="/aristotle-homer.jpg" />
      <p>
        {t(lang).siteName}
        {t(lang).sidebar.intro}
      </p>
      <h3 class="subtitle">{t(lang).sidebar.Chronicles}</h3>
      <ul class="categories-menu">
        <li>
          <a href="/{lang}/category/bullit-comments">
            {t(lang).sidebar["Bullet comments"]}
          </a>
        </li>
        <li>
          <a href="/{lang}/category/films-of-the-past">
            {t(lang).sidebar["Revisiting classics"]}
          </a>
        </li>
        <li>
          <a href="/{lang}/category/more-on-hermeneutics">
            {t(lang).sidebar["More on hermeneutics"]}
          </a>
        </li>
        {#if lang == "fr"}
        <li>
          <a href="/fr/films-quebecois">
            Films québécois
          </a>
        </li>
        {/if}
      </ul>
      <h3 class="subtitle">{t(lang).sidebar["The Shrink's Toolbox"]}</h3>
      <ul class="categories-menu">
        {#each elephantBehindTheScreen as cat}
          <li><a href="/{lang}/category/{cat.slug}"> {cat.name} </a></li>
        {/each}
      </ul>
      <h3 class="subtitle">{t(lang).sidebar.Region}</h3>
      {#each regions as tag}
        <Chip
          active={isSelectedRegion(tag.id)}
          on:click={() => selectRegion(tag.id)}
        >{tag.name}</Chip
        >
      {/each}
      <h3 class="subtitle">Genre</h3>
      {#each genres as tag}
        <Chip
          active={isSelectedGenre(tag.id)}
          on:click={() => selectGenre(tag.id)}
        >{tag.name}</Chip
        >
      {/each}
    </div>
  </MainSection>
  <SiteFooter />
</div>

<style lang="scss" global>
  @import "./../static/global.scss";

  .content {
    margin-left: 10px;
  }
  .content h3 {
    font-size: 18px;
  }
  .content p {
    font-weight: 700;
    font-size: 15px;
    line-height: 31px;
  }
  .content .subtitle {
    padding-top: 30px;
  }

  ul {
    margin-left: 0;
  }

  li {
    list-style: none;
    padding: 6px 0 0;
    margin: 6px 0 0;
    border-top: 1px solid #eee;
  }

  li a {
    line-height: 31px;
    font-size: 15px;
    color: #1c7c7c;
    transition: all 0.2s ease-in-out;
  }

  li a:hover {
    color: #666;
  }

  .content img {
    width: 85%;
    margin-left: 10px;
  }
</style>
