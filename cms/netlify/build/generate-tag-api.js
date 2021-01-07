/* eslint-disable no-console */
import { createAll } from './helper'
const rootDir = `${__dirname}/../../..`
const generateTagApi = (lang) => {
  const contentDir = `${rootDir}/content/tags/${lang}`
  const apiDir = `${rootDir}/static/api/${lang}`
  const allFile = `${apiDir}/tags.json`

  createAll(contentDir, allFile, apiDir)
}
export default generateTagApi
