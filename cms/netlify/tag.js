import { getMixins } from './mixins'

class Tag {
  constructor(axios) {
    this.slug = 'tag'
    this.slugPlural = 'tags'
    this.pretty = 'Tag'
    this.plural = 'Tags'
    this.axios = axios
  }
}

// Mixins
Object.assign(Tag.prototype, getMixins)
export default Tag
