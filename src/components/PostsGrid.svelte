<script>
    import { selectedRegion, selectedGenre, nextPage } from "../stores.js";
    import PresentationalGrid from "./PresentationalGrid.svelte";
    import ArticlePreview from "./ArticlePreview.svelte";
    import { fetchNextPage } from "../actions"
    import { onMount } from "svelte";

    export let posts;
    export let lang = ""

    let fetchNext = (entries) => {
        entries.forEach(async (element) => {
            if (element.isIntersecting) {
                fetchNextPage(lang, window, $nextPage)
            }
        });
    }

    function filterPosts(posts) {
        return posts.filter((x) => {
            let valid = true;
            if (x.tags) {
                if ($selectedRegion) {
                    if (!x.tags.includes($selectedRegion)) {
                        valid = false;
                    }
                }
                if ($selectedGenre) {
                    if (!x.tags.includes($selectedGenre)) {
                        valid = false;
                    }
                }
            } else if ($selectedRegion || $selectedGenre) {
                valid = false;
            }
            return valid;
        });
    }

    onMount(() => {
        let observer = new IntersectionObserver(fetchNext, {threshold: 0.1})
        let articleHTML = document.getElementById("bottom-page");
        observer.observe(articleHTML);
    });

    $: filteredPosts = filterPosts(posts);
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
    {#if !posts.length}
        <div>No post available</div>
    {:else}
        <PresentationalGrid items={filteredPosts} let:item>
            <ArticlePreview post={item} />
        </PresentationalGrid>
    {/if}
    <div id="bottom-page"></div>
</div>
