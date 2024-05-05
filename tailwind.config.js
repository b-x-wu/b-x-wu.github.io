export default {
    content: [ './src/**/*.{js,jsx,ts,tsx}', './public/**/*.html' ],
    theme: {
        extend: {
            spacing: {
                '128': '32rem',
                '160': '40rem',
                '192': '48rem',
            },
            colors: {
                'primary': '#FF8DB0',
                'secondary': '#AF4D07',
                'enabled': '#50C4D9',
                'disabled': '#C2CCD6',
            },
            maxWidth: {
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

