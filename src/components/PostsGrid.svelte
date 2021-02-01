<script>
    import { selectedRegion, selectedGenre, nextPage, loadingPosts, allPostsLoaded, nbPostsLoaded } from "../stores.js";
    import PresentationalGrid from "./PresentationalGrid.svelte";
    import ArticlePreview from "./ArticlePreview.svelte";
    import { fetchNextPage } from "../actions"
    import { onMount } from "svelte";

    export let posts;
    export let lang = ""

    function isVisible(e) {
        return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
    }

    let fetchNext = (entries) => {
        entries.forEach(async (element) => {
            if (element.isIntersecting && !$allPostsLoaded) {
                while (isVisible(element.target) && !$allPostsLoaded) {
                    await fetchNextPage(lang, window, $nextPage)
                }
            }
        });
    }

    let filterPosts = (posts, selectedRegion, selectedGenre) => {
        let filteredByTags = posts.filter((x) => {
            let valid = true;
            if (x.tags) {
                if (selectedRegion) {
                    if (!x.tags.includes(selectedRegion)) {
                        valid = false;
                    }
                }
                if (selectedGenre) {
                    if (!x.tags.includes(selectedGenre)) {
                        valid = false;
                    }
                }
            } else if (selectedRegion || selectedGenre) {
                valid = false;
            }
            return valid;
        });
        // console.log(filteredByTags.length)
        // console.log($nbPostsLoaded)
        // if (filteredByTags.length <= nbPostsLoaded && !$allPostsLoaded && process.browser) {
        //     fetchNextPage(lang, window, $nextPage)
        // } else {
        //     nbPostsLoaded.set(filteredByTags.length)
        // }
        return filteredByTags
    }

    onMount(() => {
        let observer = new IntersectionObserver(fetchNext, {threshold: 0})
        let articleHTML = document.getElementById("bottom-page");
        observer.observe(articleHTML);
    });

    $: filteredPosts = filterPosts(posts, $selectedRegion, $selectedGenre);
</script>

<div>
    {#if $selectedGenre || $selectedRegion}
        <p>Filtered by :</p>
        <div class="filter-infos">
            {#if $selectedRegion}
                <p>Region: {$selectedRegion}</p>
            {/if}
            {#if $selectedGenre}
                <p>Genre: {$selectedGenre}</p>
            {/if}
        </div>
    {/if}
    {#if !posts.length && !$loadingPosts}
        <div>No post available</div>
    {:else}
        <PresentationalGrid items={filteredPosts} let:item>
            <ArticlePreview post={item} />
        </PresentationalGrid>
        {#if !!$loadingPosts}
            Loading posts...
        {/if}
    {/if}
    <div id="bottom-page"></div>
</div>
