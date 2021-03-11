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

    tagsFr = await fillMissingData(tagsEn, tagsFr);
    
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

async function fillMissingData(tagsEn, tagsFr) {
  for (let i = 0; i < tagsEn.length; i++) {
    let tagIndex = tagsFr.findIndex(x => x.slug === tagsEn[i].slug)
    if (tagIndex === -1) {
      tagsFr[tagIndex] = tagsEn[i]
    } else {
      tagsFr[tagIndex].id = tagsEn[i].id
    }
  }
  
  return tagsFr
}