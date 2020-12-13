module.exports = {
    '*.{ts,js}': (files) => {
        return ['pnpm run lint:es'];
    },
    '*.css': (files) => {
        return ['pnpm run lint:style:css'];
    },
    '*.scss': (files) => {
        return ['pnpm run lint:style:scss'];
    },
    '*.{ts,js,css,scss}': (files) => {
        return ['pnpm run format'];
    },
};
