/* eslint-disable no-console */
import { createAll } from './helper'
const rootDir = `${__dirname}/../../..`
const generateTagApi = () => {
  const contentDir = `${rootDir}/content/tags`
  const apiDir = `${rootDir}/static/api`
  const allFile = `${apiDir}/tags.json`

  createAll(contentDir, allFile, apiDir)
}
export default generateTagApi
