import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

function defaultLayoutPlugin() {
  return function (tree, file) {
    file.data.astro.frontmatter.layout = '@layouts/Post.astro';
  };
}



// https://astro.build/config
export default defineConfig({
  site: "https://themovieshrink.com/",
  markdown: {
    remarkPlugins: [defaultLayoutPlugin]
  },
  build: {
    format: 'file'
  },
  integrations: [compress(),
    sitemap({  
      i18n: {
        defaultLocale: 'en',   // All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
        locales: {
          en: 'en-CA',         // The `defaultLocale` value must present in `locales` keys
          fr: 'fr-CA',
        },
      }
    })]
});