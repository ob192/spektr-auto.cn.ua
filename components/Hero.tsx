import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Hero() {
    return (
        <section className="relative pt-[100px] md:pt-[130px] pb-16 md:pb-20 bg-black overflow-hidden">
            {/* Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,208,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,208,0,0.03) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Gradient */}
            <div
                className="absolute -top-[40%] -right-[30%] w-[500px] h-[500px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(255,208,0,0.06) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-yellow-subtle border border-yellow/20 text-yellow px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5 animate-fadeUp">
                            <div className="w-1.5 h-1.5 bg-yellow rounded-full animate-blink" />
                            Чернігів • Працюємо Пн–Пт
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 animate-fadeUp">
                            <span className="text-yellow">Надійний</span> автосервіс у&nbsp;Чернігові
                        </h1>

                        <p className="text-base md:text-lg text-gray-light mb-7 max-w-lg leading-relaxed animate-fadeUp">
                            Діагностика, ремонт двигуна, гальма, КПП, шини та електрика. Чесні ціни, досвідчені
                            майстри.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 mb-10 animate-fadeUp">
                            <a
                                href={`tel:${BUSINESS_INFO.phone}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow text-black rounded-lg font-display font-bold hover:bg-yellow-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(255,208,0,0.35)]"
                            >
                                📞 Зателефонувати зараз
                            </a>
                            <Link
                                href="#services"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue text-white rounded-lg font-display font-bold hover:bg-blue-light hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
                            >
                                Наші послуги
                            </Link>
                        </div>
                    </div>

                    {/* Hero Photo */}
                    <div className="mt-10 lg:mt-0 rounded-2xl overflow-hidden border border-yellow/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] animate-fadeUp">
                        <Image
                            src="/photo-exterier.jpg?w=900&q=80"
                            alt="СТО Спектр Авто - зовнішній вигляд"
                            width={900}
                            height={600}
                            className="w-full h-auto object-cover aspect-video lg:aspect-[4/3]"
                            priority
                        />
                        <div className="bg-black-mid px-4 py-3 flex items-center gap-2 text-sm text-gray-light">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                            СТО «Спектр Авто» - {BUSINESS_INFO.address.city}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}