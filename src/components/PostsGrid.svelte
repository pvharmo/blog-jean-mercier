<script>
    import { selectedRegion, selectedGenre } from "../stores.js";
    import PresentationalGrid from "./PresentationalGrid.svelte";
    import ArticlePreview from "./ArticlePreview.svelte";

    export let posts = [];

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

    // $: filteredPosts = filterPosts(posts);
    $: filteredPosts = posts;
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
</div>
