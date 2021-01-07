/* eslint-disable no-console */
import { createAll } from './helper'
const rootDir = `${__dirname}/../../..`
const generateCategoryApi = (lang) => {
  const contentDir = `${rootDir}/content/categories/${lang}`
  const apiDir = `${rootDir}/static/api/${lang}`
  const allFile = `${apiDir}/categories.json`

  createAll(contentDir, allFile, apiDir)
}
export default generateCategoryApi
