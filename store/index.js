export const state = () => ({
  articles: []
})

export const actions = {
  fetchArticles() {
    this.$axios.get()
  }
}
