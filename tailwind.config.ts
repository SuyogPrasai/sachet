import { Bebas_Neue } from "next/font/google";
import type { Config } from "tailwindcss";
// TODO NEEDS REFACTORING

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				'lgplus': '1400px',
			},

			colors: {
				background: 'hsl(var(--background))',
				foreground: { DEFAULT: 'hsl(var(--foreground))', highlight: 'hsl(var(--foreground-highlight))' },
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					accent: 'hsl(var(--primary-accent))',
					highlight: 'hsl(var(--primary-highlight))',
					block: 'hsl(var(--primary-block))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))',
					light_dark: 'hsl(var(--primary-light-dark))',
					placeholder: 'hsl(var(--primary-placeholder))',

					high_bright: 'hsl(var(--primary-high-bright))',
					low_bright: 'hsl(var(--primary-low-bright))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					background: 'hsl(var(--secondary-background))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeInDown: {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeInDown: 'fadeInDown 0.5s ease-out forwards',

			},
			fontFamily: {
				roboto: ['var(--font-roboto)', 'sans-serif'],
				oswald: ['var(--font-oswald)', 'sans-serif'],
				bebas_neue: ['var(--font-bebas_neue)', 'sans-serif'],
				lato: ['var(--font-lato)', 'sans-serif'],

			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
