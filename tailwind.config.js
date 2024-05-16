import plugin from 'tailwindcss/plugin';

const autoAddSelectorVariantPlugin = plugin.withOptions((options = {}) => {
    const COLOR_UTILITIES_TO_PROPERTY = { 'bg': 'background-color', 'text': 'color' };
    return ({ addComponents, addVariant }) => {
        // add variants
        const variants = Object.keys(options);
        variants.forEach((variant) => {
            addVariant(
                variant,
                `.${variant} &`,
            );
        });
        

        // when default selector is used also add in the variants

        const selectorObjects = variants.reduce(
            (accumulator, variant) => {
                const colors = Object.keys(options[variant]);
                return [ ...accumulator, ...colors.map((color) => ({ variant, color })) ];
            },
            [],
        )
            .reduce(
                (accumulator, selectorObject) => 
                    [ ...accumulator, ...Object.keys(COLOR_UTILITIES_TO_PROPERTY).map((utility => ({ ...selectorObject, utility }))) ],
                [],
            );

        addComponents(
            Object.fromEntries(
                selectorObjects.map((selectorObject) => {
                    const componentSelector = `.${selectorObject.variant} .${selectorObject.utility}-${selectorObject.color}`;
                    const componentValue = { [COLOR_UTILITIES_TO_PROPERTY[selectorObject.utility]]: options[selectorObject.variant][selectorObject.color] };
                    return [ componentSelector, componentValue ];
                }),
            ),
        );
    };
});

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
                'background': '#FFF',
                'text': '#000',
                'primary': '#FF8DB0',
                'secondary': '#AF4D07',
                'enabled': '#50C4D9',
                'disabled': '#0004',
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
                '1/2': '50%',
                '3/5': '60%',
                '4/5': '80%',
            },
            minHeight: {
                '1/5': '20%',
                '2/5': '40%',
                '1/2': '50%',
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
        // background clip to image
        plugin(({ matchUtilities }) => {
            matchUtilities(
                {
                    'bg-clip': (value) => ({
                        'mask-image': value,
                        'mask-repeat': 'no-repeat',
                        'mask-size': 'contain',
                        '-webkit-mask-image': value,
                        '-webkit-mask-repeat': 'no-repeat',
                        '-webkit-mask-size': 'contain',
                    }),
                }, {
                    type: [ 'url', 'image' ],
                },
            );
        }),
        // auto add selector based variants
        autoAddSelectorVariantPlugin({
            'dark': {
                'background': '#000',
                'text': '#FFF',
                'primary': '#df3568',
                'secondary': '#f8954f',
                'enabled': '#279bb0',
                'disabled': '#FFF7',
            },
        }),
    ],
};

