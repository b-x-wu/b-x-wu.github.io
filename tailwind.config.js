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
            maxWidth: {
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
            },
            listStyleImage: {
                'bullet': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' viewBox=\'7 5 9 9\' preserveAspectRatio=\'xMidYMid meet\' width=\'12\' height=\'10\'%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'6\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'7\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'7\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'8\' y=\'8\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'8\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'12\' y=\'8\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'7\' y=\'9\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'8\' y=\'9\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'9\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'13\' y=\'9\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'10\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'10\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'12\' y=\'10\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'11\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'11\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'12\' fill=\'hsl(0, 0%25, 0%25)\'%3E%3C/rect%3E%3C/svg%3E")',
                'bullet-primary': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' viewBox=\'7 5 9 9\' preserveAspectRatio=\'xMidYMid meet\' width=\'12\' height=\'10\'%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'6\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'7\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'7\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'8\' y=\'8\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'8\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'12\' y=\'8\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'7\' y=\'9\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'8\' y=\'9\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'9\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'13\' y=\'9\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'10\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'10\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'12\' y=\'10\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'11\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'11\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'12\' fill=\'hsl(342, 100%25, 78%25)\'%3E%3C/rect%3E%3C/svg%3E")',
                'bullet-disabled': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' viewBox=\'7 5 9 9\' preserveAspectRatio=\'xMidYMid meet\' width=\'12\' height=\'10\'%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'6\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'7\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'7\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'8\' y=\'8\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'8\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'12\' y=\'8\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'7\' y=\'9\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'8\' y=\'9\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'9\' y=\'9\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'13\' y=\'9\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'10\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'10\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'12\' y=\'10\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'11\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'11\' y=\'11\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3Crect width=\'1\' height=\'1\' x=\'10\' y=\'12\' fill=\'hsl(231, 8%25, 66%25)\'%3E%3C/rect%3E%3C/svg%3E")',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

