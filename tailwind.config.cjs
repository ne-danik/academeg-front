module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      'primary': '#ABC2D3',
      'gray-dark': '#333333',
      'gray': '#808080',
      'black': '#000000',
      'white': '#ffffff',
      'red': '#ff0000',
    },
    fontFamily: {
      'sans': ['Posterama', ],
      'exo': ['"Exo 2"', ],
      'display': ['Arial']
    },
    screens: {
      'xs': [{
        'max': '320px'
      }, ],
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px'
    },
    extend: {
      fontSize: {
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '3.5xl': '2rem',
        '4xl': '2.25rem',
        '5.5xl': '3.5rem',
        '6.5xl': '4rem'
      },
      zIndex: {
        '100': '100',
        '500': '500',
        '1000': '1000',
      },
      transitionDuration: {
        '600': '600ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        'ping': 'ping 1.8s cubic-bezier(0.24, 0.64, 0.36, 1) infinite',
      }
    },
    plugins: [],
  }
}