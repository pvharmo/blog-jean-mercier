import { writable } from 'svelte/store';

export let selectedRegion = writable(null)
export let selectedGenre = writable(null)

export const tags = writable([])
export const categories = writable([])

export const posts = writable([])

export const nextPage = writable(0)

export const bulletComments = writable([])
export const revisitingClassics = writable([])
export const moreOnHermeneutics = writable([])

export const loadingPosts = writable(false)

export const allPostsLoaded = writable(false)

export const nbPostsLoaded = writable(0)