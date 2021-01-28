<div></div>

<script>
    import { goto } from '@sapper/app';
    import { onMount } from "svelte";

    onMount(() => {
        const lang = window.localStorage.getItem("lang");
    
        if(lang) {
            goto("/" + lang)
        } else {
            goto("/en")
        }
    })
</script>