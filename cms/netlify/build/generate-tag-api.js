/* eslint-disable no-console */
import siteConfig from '../../../config/_siteConfig'
import { createPagination, createMeta, createAll } from './helper'
const rootDir = `${__dirname}/../../..`
const generateTagApi = () => {
  const contentDir = `${rootDir}/content/tags`
  const apiDir = `${rootDir}/static/api`
  const allFile = `${apiDir}/tags.json`
  const metaFile = `${apiDir}/tags-meta.json`
  const pages = siteConfig.tags.perPage
  const doneMessage = `{totalNumber} tags generated in tags API`

  createAll(contentDir, allFile, apiDir)
    .then((all) => {
      const totalPages = createPagination(pages, all, `${apiDir}/tags`)
      createMeta({ totalPages }, metaFile)
      console.log(doneMessage.replace('{totalNumber}', all.length))
    })
    .catch((err) => {
      console.log(err)
    })
}
export default generateTagApi
