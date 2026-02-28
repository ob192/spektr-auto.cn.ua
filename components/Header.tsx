'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/#services', label: 'Послуги' },
        { href: '/#why', label: 'Про нас' },
        { href: '/blog', label: 'Блог' },
        { href: '/faq', label: 'Питання' },
        { href: '/#contact', label: 'Контакти' },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-black/92 backdrop-blur-[18px] border-b transition-shadow ${
                    scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.5)] border-yellow/10' : 'border-yellow/10'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-[62px] md:h-[70px] flex items-center justify-between">
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-gray-light hover:text-white hover:bg-white/6 transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={`tel:${BUSINESS_INFO.phone}`}
                                    className="ml-2 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-yellow text-black hover:bg-yellow-hover transition-all shadow-[0_2px_10px_rgba(255,208,0,0.3)]"
                                >
                                    📞 Зателефонувати
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex flex-col gap-1 p-1.5"
                        aria-label="Меню"
                    >
                        <span className="w-5 h-0.5 bg-white rounded transition-transform" />
                        <span className="w-5 h-0.5 bg-white rounded transition-transform" />
                        <span className="w-5 h-0.5 bg-white rounded transition-transform" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[1001] bg-black/60 backdrop-blur md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className="absolute top-0 right-0 w-[270px] h-full bg-black-light p-5 border-l border-yellow/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-5">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white text-2xl p-1"
                            >
                                ✕
                            </button>
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3.5 font-display font-semibold text-white border-b border-gray-dark"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={`tel:${BUSINESS_INFO.phone}`}
                            className="block mt-5 bg-yellow text-black text-center py-3.5 rounded-lg font-display font-extrabold"
                        >
                            📞 {BUSINESS_INFO.phoneFormatted}
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}