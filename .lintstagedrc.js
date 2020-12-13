module.exports = {
    '*.{ts,js}': (files) => {
        return ['pnpm lint:es'];
    },
    '*.css': (files) => {
        return ['pnpm lint:style:css'];
    },
    '*.scss': (files) => {
        return ['pnpm lint:style:scss'];
    },
    '*.{ts,js,css,scss,json}': (files) => {
        return ['pnpm format'];
    },
};
