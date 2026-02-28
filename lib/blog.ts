import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    author: string
    category: string
    image?: string
    content: string
    readingTime: string
}

export function getAllPosts(): BlogPost[] {
    const fileNames = fs.readdirSync(contentDirectory)
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '')
            const fullPath = path.join(contentDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                author: data.author || 'Спектр Авто',
                category: data.category || 'Поради',
                image: data.image,
                content,
                readingTime: readingTime(content).text,
            } as BlogPost
        })

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author || 'Спектр Авто',
            category: data.category || 'Поради',
            image: data.image,
            content,
            readingTime: readingTime(content).text,
        }
    } catch {
        return null
    }
}