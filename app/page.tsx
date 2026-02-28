import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import { BUSINESS_INFO } from '@/lib/constants'

// Trust Strip Component
function TrustStrip() {
    const items = [
        { icon: '🔧', label: 'Сертифіковані майстри', variant: 'y' },
        { icon: '🛡️', label: 'Гарантія на роботу', variant: 'y' },
        { icon: '🔍', label: 'Чесна діагностика', variant: 'b' },
        { icon: '💰', label: 'Прозорі ціни', variant: 'b' },
    ]

    return (
        <div className="bg-black-light border-t border-b border-gray-dark py-5 md:py-6">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-light">
                            <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                                    item.variant === 'y' ? 'bg-yellow-subtle' : 'bg-blue-glow'
                                }`}
                            >
                                {item.icon}
                            </div>
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// CTA Section Component
function CTASection() {
    return (
        <section className="py-14 md:py-16 bg-gradient-to-br from-black-light to-black text-center border-t border-gray-dark">
            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                    Горить <span className="text-yellow">«Check Engine»</span>?
                </h2>
                <p className="text-sm md:text-base text-gray-light mb-6 max-w-md mx-auto">
                    Більшість проблем дорожчають з часом. Зателефонуйте - проконсультуємо безкоштовно.
                </p>
                <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow text-black rounded-lg font-display font-bold text-lg hover:bg-yellow-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(255,208,0,0.35)]"
                >
                    📞 {BUSINESS_INFO.phoneFormatted}
                </a>
            </div>
        </section>
    )
}

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustStrip />
            <Services />
            <WhyUs />
            <Contact />
            <CTASection />
        </>
    )
}