/* eslint-disable no-console */
import { loadFilesContent } from './helper'
import fs from 'fs'

const rootDir = `${__dirname}/../../..`
const generateTagApi = async () => {
  const contentDir = `${rootDir}/content/tags/`
  const apiDir = `${rootDir}/static/api/`

  try {
    let tagsEn = await loadFilesContent(contentDir + "en/");
    let tagsFr = await loadFilesContent(contentDir + "fr/");
    
    writeTags(tagsEn, apiDir + "en/")
    writeTags(tagsFr, apiDir + "fr/")
  } catch (e) {
    console.log(e)
  }
}
export default generateTagApi

function writeTags(tags, dir) {
  const writeStream = fs.createWriteStream(dir + "tags.json", 'UTF-8')
  writeStream.write(JSON.stringify(tags))
}