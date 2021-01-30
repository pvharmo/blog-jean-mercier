import generatePostApi from '../build/generate-post-api'
import generateCategoryApi from '../build/generate-category-api'
import generateTagApi from '../build/generate-tag-api'
import copyStaticToDist from '../build/copy-static-to-dist'

export default () => {
  generatePostApi('en')
  // generateCategoryApi('en')
  // generateTagApi('en')
  // generatePostApi('fr')
  // generateCategoryApi('fr')
  // generateTagApi('fr')
  // copyStaticToDist()
}
