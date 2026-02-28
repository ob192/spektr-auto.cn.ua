'use client'

import { useEffect, useRef, useState } from 'react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const [todayIndex, setTodayIndex] = useState<number | null>(null)

    useEffect(() => {
        const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота']
        const today = days[new Date().getDay()]
        const index = BUSINESS_INFO.hours.findIndex((h) => h.day === today)
        setTodayIndex(index)

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

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="contact" ref={sectionRef} className="py-16 md:py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-9">
                    <div className="inline-block font-display text-xs font-extrabold tracking-[0.14em] uppercase text-yellow mb-2.5">
                        Контакти
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2.5">
                        Як нас знайти
                    </h2>
                    <p className="text-sm md:text-base text-gray-light max-w-lg leading-relaxed">
                        Зателефонуйте або приїжджайте - завжди раді допомогти.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div>
                        {/* Contact Card */}
                        <div className="reveal bg-black-light border border-gray-dark rounded-2xl overflow-hidden">
                            {/* Phone */}
                            <div className="flex gap-3.5 items-start p-5 border-b border-gray-dark">
                                <div className="w-10 h-10 bg-yellow-subtle rounded-xl flex items-center justify-center text-base flex-shrink-0">
                                    📞
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-0.5">Телефон</h4>
                                    <a
                                        href={`tel:${BUSINESS_INFO.phone}`}
                                        className="font-display text-lg md:text-xl font-extrabold text-yellow"
                                    >
                                        {BUSINESS_INFO.phoneFormatted}
                                    </a>
                                    <p className="text-xs text-gray-light mt-0.5">
                                        Натисніть, щоб зателефонувати
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex gap-3.5 items-start p-5 border-b border-gray-dark">
                                <div className="w-10 h-10 bg-yellow-subtle rounded-xl flex items-center justify-center text-base flex-shrink-0">
                                    📍
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-0.5">Адреса</h4>
                                    <p className="text-sm text-gray-light leading-relaxed">
                                        {BUSINESS_INFO.address.full}
                                    </p>
                                    <a
                                        href={BUSINESS_INFO.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-xs text-yellow font-semibold mt-1 hover:underline"
                                    >
                                        Відкрити в Google Картах
                                    </a>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex gap-3.5 items-start p-5">
                                <div className="w-10 h-10 bg-yellow-subtle rounded-xl flex items-center justify-center text-base flex-shrink-0">
                                    🕐
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-white mb-1.5">Графік роботи</h4>
                                    <table className="w-full">
                                        <tbody>
                                        {BUSINESS_INFO.hours.map((hour, index) => (
                                            <tr
                                                key={index}
                                                className={
                                                    index === todayIndex ? 'text-yellow font-bold' : 'text-gray-light'
                                                }
                                            >
                                                <td className="py-0.5 text-sm font-semibold w-32">{hour.day}</td>
                                                <td className="py-0.5 text-sm">{hour.hours}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Call Banner */}
                        <div className="reveal bg-yellow rounded-2xl p-7 text-center mt-4">
                            <h3 className="font-display text-xl font-extrabold text-black mb-1.5">
                                Потрібна консультація?
                            </h3>
                            <p className="text-sm text-black/65 mb-4">
                                Зателефонуйте - відповімо на всі запитання
                            </p>
                            <a
                                href={`tel:${BUSINESS_INFO.phone}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-yellow rounded-xl font-display font-bold text-lg shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-transform"
                            >
                                📞 {BUSINESS_INFO.phoneFormatted}
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Map */}
                    <div>
                        <div className="reveal rounded-2xl overflow-hidden border border-gray-dark">
                            <iframe
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1006.5399539098315!2d${BUSINESS_INFO.coordinates.lng}!3d${BUSINESS_INFO.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d549164705a219%3A0x3d0496989597c1ec!2z0KHQotCeIMKr0KHQv9C10LrRgtGAINCQ0LLRgtC-wrs!5e0!3m2!1sen!2sua!4v1772300413856!5m2!1sen!2sua`}
                                width="100%"
                                height="380"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="СТО Спектр Авто"
                                className="w-full h-[280px] md:h-[380px]"
                            />
                        </div>
                        <a
                            href={BUSINESS_INFO.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reveal block bg-black-mid border border-gray-dark rounded-2xl p-3.5 text-center mt-3 hover:border-blue/40 transition-colors"
                        >
              <span className="text-sm font-semibold text-blue-light">
                📍 Прокласти маршрут у Google Картах
              </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}