/* eslint-disable no-console */
import { createAll } from './helper'
const rootDir = `${__dirname}/../../..`
const generateCategoryApi = () => {
  const contentDir = `${rootDir}/content/categories`
  const apiDir = `${rootDir}/static/api`
  const allFile = `${apiDir}/categories.json`

  createAll(contentDir, allFile, apiDir)
}
export default generateCategoryApi
