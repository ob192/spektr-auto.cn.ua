import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
    title: 'Блог',
    description:
        'Корисні поради щодо обслуговування автомобіля, діагностики та ремонту від експертів СТО «Спектр Авто».',
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="pt-24 md:pt-28 pb-16 md:pb-20 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <nav className="mb-6 text-sm text-gray-light">
                    <Link href="/" className="hover:text-yellow transition-colors">
                        Головна
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-white">Блог</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="inline-block font-display text-xs font-extrabold tracking-[0.14em] uppercase text-yellow mb-2.5">
                        Блог
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                        Корисні поради для автовласників
                    </h1>
                    <p className="text-base md:text-lg text-gray-light max-w-2xl leading-relaxed">
                        Експертні статті про обслуговування, ремонт та догляд за автомобілем від майстрів СТО
                        «Спектр Авто».
                    </p>
                </div>

                {/* Blog Grid */}
                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-light text-lg">Статті скоро з'являться...</p>
                    </div>
                )}
            </div>
        </div>
    )
}