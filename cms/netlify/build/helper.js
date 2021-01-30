import fs from 'fs'
import rimraf from 'rimraf'
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
            console.log(index)
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
