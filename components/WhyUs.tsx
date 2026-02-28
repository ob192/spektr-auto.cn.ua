'use client'

import { useEffect, useRef } from 'react'
import { WHY_US } from '@/lib/constants'
import clsx from 'clsx'

export default function WhyUs() {
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
        <section
            id="why"
            ref={sectionRef}
            className="py-16 md:py-20 bg-black-light border-t border-b border-gray-dark"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-9">
                    <div className="inline-block font-display text-xs font-extrabold tracking-[0.14em] uppercase text-yellow mb-2.5">
                        Чому обирають нас
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2.5">
                        Що відрізняє «Спектр Авто»
                    </h2>
                    <p className="text-sm md:text-base text-gray-light max-w-lg leading-relaxed">
                        Автосервіс має бути чесним, зрозумілим та без стресу.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-2">
                    {WHY_US.map((item, index) => (
                        <div key={index} className="reveal flex gap-3.5 items-start">
                            <div
                                className={clsx(
                                    'w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0',
                                    item.variant === 'y' && 'bg-yellow-subtle',
                                    item.variant === 'b' && 'bg-blue-glow'
                                )}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-display text-base md:text-lg font-bold text-white mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-light leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}