import plugin from 'tailwindcss/plugin';

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
                'disabled': '#a3a5b0',
            },
            minWidth: {
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
            },
            maxWidth: {
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
            },
            minHeight: {
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
            },
            listStyleImage: {
                'bullet-disabled': 'url("static/icons/bullet-disabled.svg")',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(({ matchUtilities }) => {
            matchUtilities(
                {
                    'bg-clip': (value) => ({
                        'mask-image': value,
                        'mask-repeat': 'no-repeat',
                        '-webkit-mask-image': value,
                        '-webkit-mask-repeat': 'no-repeat',
                        '-webkit-mask-size': 'contain',
                    }),
                }, {
                    type: [ 'url', 'image' ],
                },
            );
        }),
    ],
};

