module.exports = {
    content: ["./public/*.html"],
    theme: {
        extend: {},
    },
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ],
}