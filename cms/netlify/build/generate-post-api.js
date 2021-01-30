/* eslint-disable no-console */

import fs from 'fs'
import rimraf from 'rimraf'
import matter from 'gray-matter'
import { flattenResource } from '../helper'

import {
  createAll,
  createPostsList
} from './helper'

const rootDir = `${__dirname}/../../..`
const generatePostApi = async (lang) => {
  const contentDir = `${rootDir}/content/posts`
  const apiDir = `${rootDir}/static/api`
  
  let postsEn = await loadPosts(contentDir + "/en/");
  let postsFr = await loadPosts(contentDir + "/fr/");

  postsFr = await fillMissingData(postsEn, postsFr);

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
      postsFr[postIndex].date = postsEn[i].slug
      postsFr[postIndex].youtubeMovieTrailer = postsEn[i].youtubeMovieTrailer
      postsFr[postIndex].author = postsEn[i].author
    }
  }
  
  return postsFr
}

async function loadPosts(dir) {
  const posts = []
  const files = fs.readdirSync(dir)

  for await (const file of files) {
    const {content, slug} = await readFile(file, dir)
    const post = parseFile(content, slug)
    posts.push(post)
  }

  return posts
}

async function readFile(file, dir) {
  let content
  const readStream = fs.createReadStream(dir + file, 'UTF-8')
  
  for await (const data of readStream) {
    content = data
  }

  const slug = file.replace(/.md$/, '')
  
  return { content , slug }
}

function parseFile(content, slug) {
  const parsed = matter(content)
  delete parsed.buffer
  parsed.data.slug = slug
  return flattenResource(parsed)
}

async function writePosts(posts, dir) {
  for (const post of posts) {
    writePost(post, dir)
  }
}

async function writePost(post, dir) {
  const writeStream = fs.createWriteStream(dir + "content/" + post.slug + ".json", 'UTF-8')
  writeStream.write(JSON.stringify(post))
}