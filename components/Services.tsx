'use client'

import { useEffect, useRef } from 'react'
import { SERVICES } from '@/lib/constants'

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.08 }
        )

        const cards = sectionRef.current?.querySelectorAll('.reveal')
        cards?.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="services" ref={sectionRef} className="py-16 md:py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-9">
                    <div className="inline-block font-display text-xs font-extrabold tracking-[0.14em] uppercase text-yellow mb-2.5">
                        Наші послуги
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2.5">
                        Повний спектр автосервісу
                    </h2>
                    <p className="text-sm md:text-base text-gray-light max-w-lg leading-relaxed">
                        Від планового ТО до капітального ремонту - все під одним дахом.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="reveal bg-black-light border border-gray-dark rounded-2xl p-6 md:p-5 hover:border-yellow/20 hover:bg-black-mid transition-all relative overflow-hidden group"
                        >
                            {/* Accent Bar */}
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-yellow scale-y-0 origin-top group-hover:scale-y-100 transition-transform" />

                            <div className="flex flex-col md:flex-row md:items-start gap-3.5 md:gap-0 md:flex-col">
                                <div className="w-11 h-11 bg-yellow-subtle rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-yellow-glow transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
                            </div>
                            <p className="text-sm text-gray-light leading-relaxed mt-2.5">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}