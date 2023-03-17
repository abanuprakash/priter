module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    [
      '@fullhuman/postcss-purgecss',
      process.env.NODE_ENV === 'production'
        ? {
            // the paths to all template files
            content: [
              './src/**/*.{js,jsx,ts,tsx}',
              './styles/globals.css',
            ],
            // function used to extract class names from the templates
            defaultExtractor: (content) => {
              const broadMatches =
                content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
              const innerMatches =
                content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
              return broadMatches.concat(innerMatches);
            },
          }
        : false,
    ],
  ],
};