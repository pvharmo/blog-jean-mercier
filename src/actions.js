import axios from "./axios";
import { tags, categories, posts } from "./stores"

export let fetchSiteContent = async (context, lang) => {
    const postsListResponse = await context.fetch(`/api/${lang}/posts-list.json`);
    const postsListData = await postsListResponse.json();

    fetchCategories(context, lang);
    fetchTags(context, lang);
    posts.set(postsListData)
}

export let fetchArticle = async (post, lang = "en") => {
    if (post && (!post.loaded || post.lang !== lang)) {
        let res;
        try {
            res = await axios.get(`/api/${lang}/content/${post.slug}.json`)
        } catch (e) {
            console.log(e)
            if (lang !== "en") {
                try {
                    res = await axios.get(`/api/en/content/${post.slug}.json`)
                } catch {
                    console.log("There was an error fetching article content.")
                }
            }
        } finally {
            let post = res.data;
            post.loaded = true;
        
            posts.update((val) => {
                const index = val.findIndex((x) => x.slug == post.slug);
                val[index] = post;
                return val;
            });
        
            if (!post.tags) {
                post.tags = [];
            }
            if (!post.category) {
                post.category = [];
            }
            if (!post.excerpt) {
                post.excerpt = "";
            }
        }
    }
    return post;
};

export let fetchCategories = async (context, lang) => {
    const categoriesResponse = await context.fetch(`/api/${lang}/categories.json`);
    const categoriesData = await categoriesResponse.json();

    categories.set(categoriesData)
}

export let fetchTags = async (context, lang) => {
    const tagsResponse = await context.fetch(`/api/${lang}/tags.json`);
    const tagsData = await tagsResponse.json();

    tags.set(tagsData)
}