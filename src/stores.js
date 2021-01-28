import { derived, writable } from 'svelte/store';

export let selectedRegion = writable(null)
export let selectedGenre = writable(null)

export const tags = writable([])
export const categories = writable([])

export const posts = writable([])

export const filteredPosts = derived([posts, selectedGenre, selectedRegion], ([$posts, $selectedGenre, $selectedRegion]) => {
    return $posts.filter((x) => {
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
})