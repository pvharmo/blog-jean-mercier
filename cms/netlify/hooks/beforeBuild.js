import generatePostApi from '../build/generate-post-api'
import generateCategoryApi from '../build/generate-category-api'
import generateTagApi from '../build/generate-tag-api'
import copyStaticToDist from '../build/copy-static-to-dist'
import fs from 'fs'

const rootDir = `${__dirname}/../../..`
export default () => {
  const apiDir = `${rootDir}/static/api`
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir + "/en/content", { recursive: true })
    fs.mkdirSync(apiDir + "/fr/content", { recursive: true })
  }
  generatePostApi(apiDir)
  generateCategoryApi(apiDir)
  generateTagApi(apiDir)
  copyStaticToDist()
}
