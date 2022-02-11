module.exports = {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            borderWidth: {
                0: '0',
                default: '1px',
                2: '2px',
                4: '4px',
            },
            colors: {
                transparent: 'transparent',
                black: '#000',
                white: '#fff',
                gray: {
                    100: '#f7fafc',
                    // ...
                    900: '#1a202c',
                },
                cyan: '#9cdbff',
                purple: {
                    light: '#d05ce3',
                    default: '#9c27b0',
                    dark: '#6a0080',
                    'extra-dark': '#490059',
                },
                yellow: {
                    light: '#fffb85',
                    default: '#ffc800',
                    dark: '#ffa600',
                },
            },
            fontFamily: {
                display: ['Gilroy', 'sans-serif'],
                body: ['Graphik', 'sans-serif'],
            },
            spacing: {
                96: '24rem',
                128: '32rem',
            },
        },
    },
}
