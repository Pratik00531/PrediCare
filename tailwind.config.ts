
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New simplified theme - only 3 colors
				theme: {
					// Primary Blue
					blue: '#3B82F6',
					'blue-light': '#60A5FA',
					'blue-dark': '#1D4ED8',
					'blue-50': '#EFF6FF',
					'blue-100': '#DBEAFE',
					'blue-200': '#BFDBFE',
					'blue-300': '#93C5FD',
					'blue-400': '#60A5FA',
					'blue-500': '#3B82F6',
					'blue-600': '#2563EB',
					'blue-700': '#1D4ED8',
					'blue-800': '#1E40AF',
					'blue-900': '#1E3A8A',
					
					// Soft Seafoam Green
					seafoam: '#A8D5BA',
					'seafoam-light': '#C1E3D1',
					'seafoam-dark': '#8BC7A3',
					'seafoam-50': '#F0F9F4',
					'seafoam-100': '#E1F4E8',
					'seafoam-200': '#C7E9D2',
					'seafoam-300': '#A8D5BA',
					'seafoam-400': '#8BC7A3',
					'seafoam-500': '#6FB88D',
					'seafoam-600': '#5A9B76',
					'seafoam-700': '#4A7D61',
					'seafoam-800': '#3D6350',
					'seafoam-900': '#325242',
					
					// Soft Indigo
					indigo: '#A9A9D9',
					'indigo-light': '#BCBCE3',
					'indigo-dark': '#9595CF',
					'indigo-50': '#F4F4FB',
					'indigo-100': '#E9E9F7',
					'indigo-200': '#D7D7EF',
					'indigo-300': '#BCBCE3',
					'indigo-400': '#A9A9D9',
					'indigo-500': '#9595CF',
					'indigo-600': '#8080C5',
					'indigo-700': '#6B6BB8',
					'indigo-800': '#5555A8',
					'indigo-900': '#434398',
					
					// Grays for backgrounds and text
					gray: {
						50: '#FFFFFF',
						100: '#F8FAFC',
						200: '#E2E8F0',
						300: '#CBD5E1',
						400: '#94A3B8',
						500: '#64748B',
						600: '#475569',
						700: '#334155',
						800: '#1E293B',
						900: '#0F172A'
					}
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
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
