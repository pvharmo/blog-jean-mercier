<script>
    import { selectedRegion, selectedGenre, nextPage, loadingPosts, allPostsLoaded, nbPostsLoaded } from "../stores.js";
    import PresentationalGrid from "./PresentationalGrid.svelte";
    import ArticlePreview from "./ArticlePreview.svelte";
    import { fetchNextPage } from "../actions"
    import { onMount } from "svelte";
    import t from "../locales/language"

    export let posts;
    export let lang = ""

    function isVisible(e) {
        return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
    }

    let fetchNext = (entries) => {
        entries.forEach(async (element) => {
            if (element.isIntersecting && !$allPostsLoaded) {
                loadingPosts.set(true)
                while (isVisible(element.target) && !$allPostsLoaded) {
                    await fetchNextPage(lang, window, $nextPage)
                }
                loadingPosts.set(false)
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
        return filteredByTags
    }

    $: filteredPosts = filterPosts(posts, $selectedRegion, $selectedGenre);
    
    onMount(() => {
        let observer = new IntersectionObserver(fetchNext, {threshold: 0})
        let articleHTML = document.getElementById("bottom-page");
        observer.observe(articleHTML);
    });
</script>

<div>
    {#if $selectedGenre || $selectedRegion}
        <p>{t(lang)["Filtered by"]} :</p>
        <div class="filter-infos">
            {#if $selectedRegion}
                <p>{t(lang).sidebar.Region}: {$selectedRegion}</p>
            {/if}
            {#if $selectedGenre}
                <p>Genre: {$selectedGenre}</p>
            {/if}
        </div>
    {/if}
    {#if !filteredPosts.length && !$loadingPosts}
        <div>{t(lang)["No post available"]}</div>
    {:else}
        {#if !!$loadingPosts && !filteredPosts.length}
            {t(lang)["Loading posts..."]}
        {:else}
            <PresentationalGrid items={filteredPosts} let:item>
                <ArticlePreview post={item} />
            </PresentationalGrid>
        {/if}
    {/if}
    <div id="bottom-page"></div>
</div>
