import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { BUSINESS_INFO } from '@/lib/constants'

interface BlogPostPageProps {
    params: { slug: string }
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getPostBySlug(params.slug)

    if (!post) {
        return {}
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: post.image ? [{ url: post.image }] : [],
        },
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const articleSchema = generateArticleSchema({
        title: post.title,
        description: post.description,
        url: `https://spektr-auto.cn.ua/blog/${post.slug}`,
        publishedDate: post.date,
        modifiedDate: post.date,
        author: post.author,
        image: post.image,
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Головна', url: 'https://spektr-auto.cn.ua' },
        { name: 'Блог', url: 'https://spektr-auto.cn.ua/blog' },
        { name: post.title, url: `https://spektr-auto.cn.ua/blog/${post.slug}` },
    ])

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <article className="pt-24 md:pt-28 pb-16 md:pb-20 bg-black min-h-screen">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 text-sm text-gray-light">
                        <Link href="/" className="hover:text-yellow transition-colors">
                            Головна
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href="/blog" className="hover:text-yellow transition-colors">
                            Блог
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">{post.title}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-light mb-4">
              <span className="px-3 py-1 bg-yellow-subtle text-yellow rounded-full font-semibold">
                {post.category}
              </span>
                            <span>{new Date(post.date).toLocaleDateString('uk-UA')}</span>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-light leading-relaxed">{post.description}</p>
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-gray-dark">
                            <Image src={post.image} alt={post.title} fill className="object-cover" />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-yellow
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-light prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-yellow prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-ul:my-6 prose-li:text-gray-light prose-li:mb-2
              prose-img:rounded-xl prose-img:border prose-img:border-gray-dark
              prose-code:text-yellow prose-code:bg-yellow-subtle prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA */}
                    <div className="mt-16 p-8 bg-yellow rounded-2xl text-center">
                        <h3 className="font-display text-2xl font-extrabold text-black mb-2">
                            Потрібна допомога?
                        </h3>
                        <p className="text-black/70 mb-5">
                            Зателефонуйте - відповімо на всі ваші запитання про ремонт
                        </p>
                        <a
                            href={`tel:${BUSINESS_INFO.phone}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-yellow rounded-xl font-display font-bold text-lg shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-transform"
                        >
                            📞 {BUSINESS_INFO.phoneFormatted}
                        </a>
                    </div>
                </div>
            </article>
        </>
    )
}