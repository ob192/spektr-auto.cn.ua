'use client'

import { useState } from 'react'

interface FAQItemProps {
    question: string
    answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-black-light border border-gray-dark rounded-2xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-black-mid transition-colors"
            >
                <h3 className="font-display text-base md:text-lg font-bold text-white">{question}</h3>
                <span
                    className={`flex-shrink-0 text-yellow text-xl transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                >
          ▼
        </span>
            </button>
            {isOpen && (
                <div className="px-5 pb-5">
                    <p className="text-sm text-gray-light leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    )
}