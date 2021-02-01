import { bulletComments, moreOnHermeneutics, posts, revisitingClassics, nextPage, tags, categories, loadingPosts, allPostsLoaded } from "./stores"

export async function fetchPost(slug, lang, context) {
    loadingPosts.update(val => {
        return val++
    })
    let post;
    try {
        const postResponse = await context.fetch(`/api/${lang}/content/${slug}.json`);
        post = await postResponse.json();
    } catch (e) {
        console.log(e)
        try {
            const postResponse = await context.get(`/api/en/content/${slug}.json`);
            post = await postResponse.json();
        } catch {
            console.log("There was an error fetching article content.");
        }
    } finally {    
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
    loadingPosts.update(val => {
        return val--
    })
    return post;
}

export async function storePost(post) {
    if (post.category.includes("Bullet comments")) {
        bulletComments.update(val => {
            val.push(post)
            return val
        })
    } else if (post.category.includes("Revisiting Classics")) {
        revisitingClassics.update(val => {
            val.push(post)
            return post
        })
    } else if (post.category.includes("More on hermeneutics")) {
        moreOnHermeneutics.update(val => {
            val.push(post)
            return val
        })
    } else {
        posts.update(val => {
            val.push(post)
            return val
        })
    }
}

export async function fetchNextPage(lang, context, pageToFetch) {
    const pageSlugsResponse = await context.fetch(`/api/page-${pageToFetch}.json`);
    if (pageSlugsResponse.status === 404) {
        allPostsLoaded.set(true)
    } else {
        const pageSlugs = await pageSlugsResponse.json();
        nextPage.set(pageToFetch + 1)
    
        for (const slug of pageSlugs) {
            const post = await fetchPost(slug, lang, context)
            storePost(post)
        }
    }
}

export let fetchArticleContent = async (context, slug, lang = "en") => {
    let post;
    try {
        const postResponse = await context.fetch(`/api/${lang}/content/${slug}.json`);
        post = await postResponse.json();
    } catch (e) {
        console.log(e)
        try {
            const postResponse = await context.get(`/api/en/content/${slug}.json`);
            post = await postResponse.json();
        } catch {
            console.log("There was an error fetching article content.");
        }
    } finally {
        post.loaded = true;
    
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
    return post;
}

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