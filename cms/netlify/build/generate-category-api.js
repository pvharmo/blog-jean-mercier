/* eslint-disable no-console */
import { loadFilesContent } from './helper'
import fs from 'fs'

const rootDir = `${__dirname}/../../..`
const generateCategoryApi = async () => {
  const contentDir = `${rootDir}/content/categories/`
  const apiDir = `${rootDir}/static/api/`

  try {
    let categoriesEn = await loadFilesContent(contentDir + "en/");
    let categoriesFr = await loadFilesContent(contentDir + "fr/");

    categoriesFr = await fillMissingData(categoriesEn, categoriesFr);
    
    writeCategories(categoriesEn, apiDir + "en/")
    writeCategories(categoriesFr, apiDir + "fr/")
  } catch (e) {
    console.log(e)
  }
}
export default generateCategoryApi

function writeCategories(tags, dir) {
  const writeStream = fs.createWriteStream(dir + "categories.json", 'UTF-8')
  writeStream.write(JSON.stringify(tags))
}

async function fillMissingData(catsEn, catsFr) {
  for (let i = 0; i < catsEn.length; i++) {
    let catIndex = catsFr.findIndex(x => x.slug === catsEn[i].slug)
    if (catIndex === -1) {
      catsFr[catIndex] = catsEn[i]
    } else {
      catsFr[catIndex].id = catsEn[i].id
    }
  }
  
  return catsFr
}