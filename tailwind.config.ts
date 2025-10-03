import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
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
				'montserrat': ['Montserrat', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
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
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'rise': {
					'0%': { transform: 'translateY(0px) scale(1)' },
					'50%': { transform: 'translateY(-5px) scale(1.05)' },
					'100%': { transform: 'translateY(0px) scale(1)' }
				},
				'text-shimmer': {
					'0%': { 
						backgroundPosition: '-200% center',
						opacity: '0.7'
					},
					'50%': {
						opacity: '1'
					},
					'100%': { 
						backgroundPosition: '200% center',
						opacity: '0.7'
					}
				},
				'letter-bounce': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
						transform: 'scale(1)'
					},
					'50%': { 
						textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
						transform: 'scale(1.05)'
					}
				},
				'wave': {
					'0%': { transform: 'rotate(0deg)' },
					'10%': { transform: 'rotate(14deg)' },
					'20%': { transform: 'rotate(-8deg)' },
					'30%': { transform: 'rotate(14deg)' },
					'40%': { transform: 'rotate(-4deg)' },
					'50%': { transform: 'rotate(10deg)' },
					'60%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(0deg)' }
				},
				'neon-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)',
						filter: 'brightness(1)'
					},
					'50%': { 
						boxShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)',
						filter: 'brightness(1.2)'
					}
				},
				'text-neon': {
					'0%, 100%': { 
						textShadow: '0 0 5px rgba(34, 211, 238, 0.8), 0 0 10px rgba(34, 211, 238, 0.6), 0 0 15px rgba(34, 211, 238, 0.4)'
					},
					'50%': { 
						textShadow: '0 0 10px rgba(34, 211, 238, 1), 0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.4)'
					}
				},
				'button-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)'
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), 0 0 45px rgba(59, 130, 246, 0.2)'
					}
				},
				'border-glow': {
					'0%, 100%': { 
						borderColor: 'rgba(59, 130, 246, 0.3)',
						boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)'
					},
					'50%': { 
						borderColor: 'rgba(59, 130, 246, 0.6)',
						boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'rise': 'rise 3s ease-in-out infinite',
				'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
				'letter-bounce': 'letter-bounce 2s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'wave': 'wave 2.5s ease-in-out infinite',
				'neon-glow': 'neon-glow 2s ease-in-out infinite',
				'text-neon': 'text-neon 2s ease-in-out infinite',
				'button-glow': 'button-glow 2s ease-in-out infinite',
				'border-glow': 'border-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;