import { BUSINESS_INFO } from '@/lib/constants'

export default function FloatingCallButton() {
    return (
        <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-yellow text-black text-2xl md:text-3xl flex items-center justify-center shadow-[0_4px_24px_rgba(255,208,0,0.45)] animate-fabPulse hover:scale-110 transition-transform"
            aria-label="Зателефонувати"
        >
            📞
        </a>
    )
}