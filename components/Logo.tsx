import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image
                    src="/favicon.svg"
                    alt="Спектр Авто"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className="font-display font-extrabold text-lg md:text-xl text-white tracking-tight">
                Спектр Авто
                <span className="block text-[0.58rem] font-medium text-gray-light tracking-widest uppercase -mt-0.5">
          СТО • Чернігів
        </span>
            </div>
        </Link>
    )
}