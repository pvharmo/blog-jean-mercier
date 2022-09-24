import { defineConfig } from 'astro/config';

function defaultLayoutPlugin () {
    return function (tree, file) {
        file.data.astro.frontmatter.layout = '@layouts/Post.astro'
    }
}

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [defaultLayoutPlugin]
    },
    build: {
        format: 'file'
    }
});
