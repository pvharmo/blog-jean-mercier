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