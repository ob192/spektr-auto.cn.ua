import { BUSINESS_INFO } from './constants'

export function generateLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        name: BUSINESS_INFO.name,
        image: 'https://spektr-auto.cn.ua/og-image.jpg', // Add your actual image
        '@id': 'https://spektr-auto.cn.ua',
        url: 'https://spektr-auto.cn.ua',
        telephone: BUSINESS_INFO.phone,
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS_INFO.address.street,
            addressLocality: BUSINESS_INFO.address.city,
            postalCode: BUSINESS_INFO.address.postalCode,
            addressCountry: BUSINESS_INFO.address.country,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS_INFO.coordinates.lat,
            longitude: BUSINESS_INFO.coordinates.lng,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '18:00',
            },
        ],
        sameAs: [
            // Add your social media links
            'https://www.facebook.com/spektrauto',
            'https://www.instagram.com/spektrauto',
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
        },
    }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export function generateArticleSchema(article: {
    title: string
    description: string
    url: string
    publishedDate: string
    modifiedDate: string
    author: string
    image?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        image: article.image || 'https://spektr-auto.cn.ua/og-image.jpg',
        datePublished: article.publishedDate,
        dateModified: article.modifiedDate,
        author: {
            '@type': 'Organization',
            name: BUSINESS_INFO.name,
        },
        publisher: {
            '@type': 'Organization',
            name: BUSINESS_INFO.name,
            logo: {
                '@type': 'ImageObject',
                url: 'https://spektr-auto.cn.ua/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url,
        },
    }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}