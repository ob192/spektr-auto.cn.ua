import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCallButton from '@/components/FloatingCallButton'
import { generateLocalBusinessSchema } from '@/lib/schema'
import { BUSINESS_INFO } from '@/lib/constants'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
    metadataBase: new URL('https://spektr-auto.cn.ua'),
    title: {
        default: `${BUSINESS_INFO.name} - Автосервіс у Чернігові`,
        template: `%s | ${BUSINESS_INFO.shortName}`,
    },
    description: BUSINESS_INFO.description,
    keywords: BUSINESS_INFO.keywords,
    authors: [{ name: BUSINESS_INFO.name }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,

    // Favicon and App Icons
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },

    // Web App Manifest
    manifest: '/site.webmanifest',

    // Apple Web App
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: BUSINESS_INFO.shortName,
    },

    openGraph: {
        type: 'website',
        locale: 'uk_UA',
        url: 'https://spektr-auto.cn.ua',
        siteName: BUSINESS_INFO.name,
        title: `${BUSINESS_INFO.name} - Автосервіс у Чернігові`,
        description: BUSINESS_INFO.description,
        images: [
            {
                url: '/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: BUSINESS_INFO.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${BUSINESS_INFO.name} - Автосервіс у Чернігові`,
        description: BUSINESS_INFO.description,
        images: ['/web-app-manifest-512x512.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk" className={`${inter.variable} ${montserrat.variable}`}>
        <head>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
            />

            {/* Theme Color for Mobile Browsers */}
            <meta name="theme-color" content="#0a0a0a" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0a0a0a" />
        </head>
        <body className="font-sans">
        <Header />
        <Analytics />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
        </body>
        </html>
    )
}