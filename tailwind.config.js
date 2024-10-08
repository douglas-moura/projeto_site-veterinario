/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    	"./public/index.html",
    	"./src/**/*.{html,js}"
    ],
    theme: {
        extend: { 
        	fontFamily: {
        		'fredoka': ['Fredoka', 'sans-serif'],
        		'montserrat': ['Montserrat', 'sans-serif']
        	},
        	animation: {
        		'fade-in': 'fadeIn .2s ease-in-out forwards',
        		'slide-left': 'slideLeft .5s ease-out forwards'
        	},
            keyframes: {
            	fadeIn: {
            		'0%': { opacity: '0' },
            		'100%': { opacity: '1' }
            	},
            	slideLeft: {
            		'0%': { transform: 'translateX(-100%)' },
            		'100%': { transform: 'translateX(0)' }
            	}
            },
            colors: {
            	'azul': {
            		100: '#CDFDFA',
            		200: '#9CF9FB',
            		300: '#6AE7F4',
            		400: '#44CEE9',
            		500: '#0DABDB',
            		600: '#0985BC',
            		700: '#06649D',
            		800: '#04477F',
            		900: '#023369'
            	}
            }
        }
    },
    plugins: []
};
