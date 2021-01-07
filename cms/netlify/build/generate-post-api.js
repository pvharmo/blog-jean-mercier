/* eslint-disable no-console */
import siteConfig from '../../../config/_siteConfig'
import {
  createPagination,
  createMeta,
  createAll,
  createPostsList
} from './helper'
const rootDir = `${__dirname}/../../..`
const generatePostApi = (lang) => {
  const contentDir = `${rootDir}/content/posts/${lang}`
  const apiDir = `${rootDir}/static/api/${lang}`
  const allFile = `${apiDir}/posts.json`
  const metaFile = `${apiDir}/posts-meta.json`
  const pages = siteConfig.posts.perPage
  const doneMessage = `{totalNumber} posts generated in posts API`

  createAll(contentDir, allFile, apiDir)
    .then((all) => {
      const totalPages = createPagination(pages, all, `${apiDir}/posts`)
      createMeta({ totalPages }, metaFile)
      createPostsList(all, `${apiDir}`)
      console.log(doneMessage.replace('{totalNumber}', all.length))
    })
    .catch((err) => {
      console.log(err)
    })
}
export default generatePostApi
