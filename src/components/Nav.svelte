<script>
  import t from "../locales/language";
  import { stores } from "@sapper/app";
  import { getPath, getLang } from "../utils";
  import { fetchCategories, fetchTags } from "../actions";

  const { page } = stores();

  $: currentPath = getPath($page.path);
  $: lang = getLang($page.path);

  let changeLang = (newLang) => {
    window.localStorage.setItem("lang", newLang);
    fetchCategories(window, newLang);
    fetchTags(window, newLang);
  };
</script>

<nav role="navigation" aria-label="main navigation">
  <div class="navbar-menu is-active">
    <ul class="navbar-end navbar-center">
      <li class="navbar-item">
        <a href="/{lang}/">{t(lang).menu.HOME}</a>
      </li>
      <li class="navbar-item">
        <a href="/{lang}/about">{t(lang).menu["ABOUT US"]}</a>
      </li>
      <li class="navbar-item">
        <a href="/{lang}/hermeneutics">{t(lang).menu.HERMENEUTICS}</a>
      </li>
      <li class="navbar-item">
        <a href="/{lang}/faq">{t(lang).menu.FAQ}</a>
      </li>
      <li class="navbar-item">
        <a href="/{lang}/contact">{t(lang).menu.CONTACT}</a>
      </li>
      <li class="navbar-item">
        {#if lang === "fr"}
          <a href={"/en" + currentPath} on:click={() => changeLang("en")}> ENGLISH </a>
        {:else}
          <a href={"/fr" + currentPath} on:click={() => changeLang("fr")}> FRANÇAIS </a>
        {/if}
      </li>
    </ul>
  </div>
</nav>

<style lang="scss" scoped>
  .navbar-menu a {
    display: block;
  }

  .navbar-center {
    margin-right: auto;
  }

  .navbar-menu {
    max-width: 937px;
    margin: auto;
    border-color: #eee;
    border-width: 3px;
    border-style: solid none;
    padding: 27px;
  }

  .navbar-menu a {
    font-size: 13px;
    font-family: "Quattrocento Sans";
    color: #999;
    transition: all 0.2s ease-in-out;
  }

  .navbar-menu a:hover {
    color: #1c7c7c;
  }

  li {
    border-top: none;
  }
</style>
