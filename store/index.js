import { isString } from 'lodash'
export const state = () => ({
  pageType: '',
  title: '',
  subtitle: '',
  featureImage: '',
  content: '',
  author: '',
  date: '',
  posts: [],
  categories: [],
  tags: [],
  selectedRegion: '',
  selectedGenre: ''
})

export const mutations = {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  set(state, data) {
    state = Object.assign(state, data)
  },
  setPostsList(state, postsList) {
    state.posts = postsList
  },
  setContent(state, post) {
    const i = state.posts.findIndex((x) => {
      return x.slug === post.slug
    })
    post.contentLoaded = true
    state.posts.splice(i, 1, post)
  },
  setContentAtIndex(state, { post, index }) {
    post.contentLoaded = true
    state.posts.splice(index, 1, post)
    state.postIndex++
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setSelectedRegion(state, name) {
    state.selectedRegion = name
  },
  setSelectedGenre(state, name) {
    state.selectedGenre = name
  }
}

export const actions = {
  nuxtServerInit(_, context) {
    this.$cms = context.store.$cms
  },
  async nuxtClientInit({ dispatch }) {
    await dispatch('loadPostsList')
    await dispatch('loadCategories')
    await dispatch('loadTags')
  },
  set({ commit }, { resource, slug }) {
    if (!resource) {
      setOtherPageData(commit, this.$siteConfig)
    } else {
      const theResource = isString(resource) ? this.$cms[resource] : resource
      const data = Object.assign(theResource.getOne(slug), {
        pageType: theResource.slug
      })
      data.slug = slug
      commit('set', data)
    }
  },
  async loadPostsList({ commit }) {
    const res = await this.$axios.get('api/posts-list.json')
    commit('setPostsList', res.data)
  },
  async loadPostContent({ commit, state }, slug) {
    const post = state.posts.find((x) => x.slug === slug)
    if (post && !post.contentLoaded) {
      const res = await this.$axios.get(`api/content/${slug}.json`)
      commit('setContent', res.data)
    }
  },
  async loadNextPosts({ commit, state }, { perPage, page }) {
    for (let i = page; i < perPage; i++) {
      const post = state.posts[i]
      if (!post.contentLoaded) {
        const res = await this.$axios.get(`api/content/${post.slug}.json`)
        commit('setContentAtIndex', {
          post: res.data,
          index: state.postIndex
        })
      }
    }
  },
  async loadCategories({ commit }) {
    const res = await this.$axios.get('api/categories.json')
    commit('setCategories', res.data)
  },
  async loadTags({ commit }) {
    const res = await this.$axios.get('api/tags.json')
    commit('setTags', res.data)
  },
  selectGenre({ commit }, name) {
    commit('setSelectedGenre', name)
  },
  selectRegion({ commit }, name) {
    commit('setSelectedRegion', name)
  }
}

function setOtherPageData(commit, siteConfig) {
  commit('set', {
    title: siteConfig.siteName,
    subtitle: siteConfig.tagline,
    featureImage: siteConfig.featureImage
  })
}
