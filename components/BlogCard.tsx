import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/blog'

interface BlogCardProps {
    post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="block bg-black-light border border-gray-dark rounded-2xl overflow-hidden hover:border-yellow/20 hover:bg-black-mid transition-all group"
        >
            {post.image && (
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-light mb-2">
                    <span>{new Date(post.date).toLocaleDateString('uk-UA')}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span className="text-yellow">{post.category}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-yellow transition-colors">
                    {post.title}
                </h3>
                <p className="text-sm text-gray-light leading-relaxed line-clamp-2">{post.description}</p>
            </div>
        </Link>
    )
}