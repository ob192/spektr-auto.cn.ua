import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                black: {
                    DEFAULT: '#0a0a0a',
                    light: '#151515',
                    mid: '#1e1e1e',
                },
                gray: {
                    dark: '#2a2a2a',
                    DEFAULT: '#555',
                    light: '#999',
                },
                yellow: {
                    DEFAULT: '#ffd000',
                    hover: '#e6bb00',
                    glow: 'rgba(255,208,0,0.15)',
                    subtle: 'rgba(255,208,0,0.08)',
                },
                blue: {
                    DEFAULT: '#2563eb',
                    light: '#3b82f6',
                    glow: 'rgba(37,99,235,0.12)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            animation: {
                fadeUp: 'fadeUp 0.6s ease-out',
                blink: 'blink 2s infinite',
                fabPulse: 'fabPulse 2.5s infinite',
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(24px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.3' },
                },
                fabPulse: {
                    '0%, 100%': { boxShadow: '0 4px 24px rgba(255,208,0,0.45)' },
                    '50%': { boxShadow: '0 4px 32px rgba(255,208,0,0.7), 0 0 0 10px rgba(255,208,0,0.08)' },
                },
            },
        },
    },
    plugins: [],
}
export default config