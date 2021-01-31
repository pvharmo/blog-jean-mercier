import fs from 'fs'
import matter from 'gray-matter'
import { flattenResource } from '../helper'

export function compareDates(a, b) {
  const aParsed = Date.parse(a.date)
  const bParsed = Date.parse(b.date)
  if (aParsed < bParsed) {
    return -1
  }
  if (aParsed > bParsed) {
    return 1
  }
  return 0
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

export async function loadFilesContent(dir) {
  const contents = []
  const files = fs.readdirSync(dir)

  for await (const file of files) {
    const {content, slug} = await readFile(file, dir)
    const post = parseFile(content, slug)
    contents.push(post)
  }

  return contents
}

export async function writeApiFiles(contents, dir) {
  for (const content of contents) {
    writeToFile(content, dir)
  }
}

export async function writeToFile(post, dir) {
  const writeStream = fs.createWriteStream(dir + "content/" + post.slug + ".json", 'UTF-8')
  writeStream.write(JSON.stringify(post))
}

export async function readFile(file, dir) {
  let content
  const readStream = fs.createReadStream(dir + file, 'UTF-8')
  
  for await (const data of readStream) {
    content = data
  }

  const slug = file.replace(/.md$/, '')
  
  return { content , slug }
}

export function parseFile(content, slug) {
  const parsed = matter(content)
  if (!parsed.content) {
    delete parsed.content
  }
  if (!parsed.excerpt) {
    delete parsed.excerpt
  }
  if (!parsed.isEmpty) {
    delete parsed.isEmpty
  }
  delete parsed.buffer
  parsed.slug = slug
  return flattenResource(parsed)
}