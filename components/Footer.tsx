import Link from 'next/link'
import Image from 'next/image'
import { BUSINESS_INFO } from '@/lib/constants'

function FooterLogo() {
    return (
        <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                    src="/favicon.svg"
                    alt="Спектр Авто"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="font-display font-extrabold text-lg text-white tracking-tight">
                Спектр Авто
                <span className="block text-[0.58rem] font-medium text-gray tracking-widest uppercase -mt-0.5">
          СТО • Чернігів
        </span>
            </div>
        </Link>
    )
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-black-light border-t border-gray-dark pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-7 md:gap-8 mb-7">
                    {/* Brand */}
                    <div>
                        <FooterLogo />
                        <p className="text-sm text-gray mt-2.5 leading-relaxed max-w-xs">
                            {BUSINESS_INFO.description}
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
                            Послуги
                        </h4>
                        <div className="space-y-1">
                            <Link href="/#services" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Заміна масла
                            </Link>
                            <Link href="/#services" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Ремонт гальм
                            </Link>
                            <Link href="/#services" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Діагностика
                            </Link>
                            <Link href="/#services" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Ремонт КПП
                            </Link>
                            <Link href="/#services" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Шини та розвал
                            </Link>
                            <Link href="/#services" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Кондиціонер
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
                            Навігація
                        </h4>
                        <div className="space-y-1">
                            <Link href="/#why" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Чому ми
                            </Link>
                            <Link href="/blog" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Блог
                            </Link>
                            <Link href="/faq" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Питання
                            </Link>
                            <Link href="/#contact" className="block text-sm text-gray hover:text-yellow py-1 transition-colors">
                                Контакти
                            </Link>
                            <a
                                href={BUSINESS_INFO.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-gray hover:text-yellow py-1 transition-colors"
                            >
                                Google Карти
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-dark pt-4.5 text-xs text-gray text-center md:text-left">
                    © {currentYear} СТО «Спектр Авто». Усі права захищені.
                </div>
            </div>
        </footer>
    )
}