/* eslint-disable no-console */

import fs from 'fs'
import { loadFilesContent, writeToFile, compareDates } from "./helper"

const rootDir = `${__dirname}/../../..`
const generatePostApi = async () => {
  const contentDir = `${rootDir}/content/posts`
  const apiDir = `${rootDir}/static/api`
  
  let postsEn = await loadFilesContent(contentDir + "/en/");
  let postsFr = await loadFilesContent(contentDir + "/fr/");

  postsFr = await fillMissingData(postsEn, postsFr);

  postsEn = sortPosts(postsEn)
  postsFr = sortPosts(postsFr)

  writePosts(postsEn, apiDir + "/en/")
  writePosts(postsFr, apiDir + "/fr/")
}

export default generatePostApi

async function fillMissingData(postsEn, postsFr) {
  for (let i = 0; i < postsEn.length; i++) {
    let postIndex = postsFr.findIndex(x => x.slug === postsEn[i].slug)
    if (postIndex === -1) {
      postsFr[postIndex] = postsEn[i]
    } else {
      postsFr[postIndex].date = postsEn[i].date
      postsFr[postIndex].youtubeMovieTrailer = postsEn[i].youtubeMovieTrailer
      postsFr[postIndex].author = postsEn[i].author
    }
  }
  
  return postsFr
}

async function writePosts(posts, dir) {
  let pages = []
  let nbPage = 0;

  for (const post of posts) {
    pages.push(post.slug)
    if (pages.length == 4) {
      const writeStream = fs.createWriteStream(`${rootDir}/static/api/page-${nbPage}.json`, 'UTF-8')
      writeStream.write(JSON.stringify(pages))
      nbPage++
      pages = []
    }
    writeToFile(post, dir)
  }
  
  const writeStream = fs.createWriteStream(`${rootDir}/static/api/page-${nbPage}.json`, 'UTF-8')
  writeStream.write(JSON.stringify(pages))
  nbPage++
  pages = []
}

function sortPosts(posts) {
  posts.sort(compareDates).reverse()

  for (let i = 0; i < posts.length - 1; i++) {
    posts[i].nextPost = posts[i + 1].slug;
  }

  return posts
}