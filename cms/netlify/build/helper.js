import fs from 'fs'
import rimraf from 'rimraf'
import { chunk } from 'lodash'
import matter from 'gray-matter'
import { flattenResource } from '../helper'

export function compareDates(a, b) {
  const aParsed = Date.parse(a.data.date)
  const bParsed = Date.parse(b.data.date)
  if (aParsed < bParsed) {
    return -1
  }
  if (aParsed > bParsed) {
    return 1
  }
  return 0
}
export function createPagination(numPages, items, dir) {
  const paginationDir = dir
  if (fs.existsSync(paginationDir)) {
    rimraf.sync(paginationDir) // Delete all previous pagination endpoints
  }
  fs.mkdirSync(paginationDir, { recursive: true })
  const paginated = chunk(items, numPages)
  let currentPage = 0
  for (let i = 0; i < paginated.length; i++) {
    currentPage = i + 1
    const chunkWriteStream = fs.createWriteStream(
      `${dir}/page-${currentPage}.json`,
      'UTF-8'
    )
    chunkWriteStream.write(JSON.stringify(paginated[i]))
  }
  return paginated.length
}
export function createPostsList(items, dir) {
  const contentDir = dir + '/content'
  if (fs.existsSync(contentDir)) {
    rimraf.sync(contentDir) // Delete all previous posts endpoints
  }
  fs.mkdirSync(contentDir, { recursive: true })
  items.sort((a, b) => {
    return Date(a.date) < Date(b.date)
  })
  const posts = []
  for (const item of items) {
    const postMeta = {}
    postMeta.tags = item.tags
    postMeta.category = item.category
    postMeta.slug = item.slug
    postMeta.date = item.date
    postMeta.title = item.title
    posts.push(postMeta)
  }
  for (const post of items) {
    fs.writeFile(
      `${contentDir}/${post.slug}.json`,
      JSON.stringify(post),
      () => {
        return true
      }
    )
  }
  fs.writeFile(`${dir}/posts-list.json`, JSON.stringify(posts), () => {
    return true
  })
  return posts
}
export function createMeta(newMeta, file) {
  let meta = {}
  if (fs.existsSync(file)) {
    meta = require(file)
  }
  const combined = Object.assign(meta, newMeta)
  const chunkWriteStream = fs.createWriteStream(file, 'UTF-8')
  chunkWriteStream.write(JSON.stringify(combined))
}
export function createAll(fromDir, toFile, apiDir) {
  // Create api dir if doesn't exist
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true })
  }
  // Create file if doesn't exist
  if (!fs.existsSync(toFile)) {
    fs.writeFileSync(toFile, '{}')
  }
  return new Promise((resolve, reject) => {
    fs.readdir(fromDir, (err, files) => {
      if (err) reject(err)
      const index = []
      const contents = {}
      files.forEach((file) => {
        contents[file] = ''
        const readStream = fs.createReadStream(`${fromDir}/${file}`, 'UTF-8')
        readStream.on('data', (data, err) => {
          if (err) throw err
          contents[file] += data
        })
        readStream.on('end', () => {
          const parsed = matter(contents[file])
          delete parsed.buffer
          parsed.data.slug = file.replace(/.md$/, '')
          index.push(parsed)

          if (index.length === files.length) {
            const writeStream = fs.createWriteStream(toFile, 'UTF-8')
            let sorted = index.sort(compareDates).reverse()
            sorted = flattenResource(sorted)
            writeStream.write(JSON.stringify(sorted))
            resolve(sorted)
          }
        })
      })
    })
  })
}
