import nextMDX from '@next/mdx';
/* eslint-disable import/no-extraneous-dependencies */
import NextBundleAnalyzer from '@next/bundle-analyzer';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    /* eslint-disable import/no-extraneous-dependencies */
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const repo = 'generative-journal';

export default withMDX(
  withBundleAnalyzer({
    eslint: {
      dirs: ['.'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    assetPrefix: `/${repo}/`,
    basePath: `/${repo}`,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-transform-runtime',
            ],
          },
        },
        parser: {
          // Set 'sourceType: module' for all JS and JSX files
          // This allows us to use ES6 import/export statements
          // even in non-ES6 files (e.g. in CommonJS modules)
          // without getting the "'import' and 'export' may appear only with 'sourceType: module'" error
          // Note that this option is available in webpack 5 and later versions
          // If you are using an earlier version of webpack, you may need to use a different parser
          // For example, you can use 'webpack-merge' to merge this parser with the default parser
          // see: https://webpack.js.org/configuration/module/#ruleparser
          parser: {
            javascript: {
              // The 'sourceType' option is set to 'module'
              // to allow ES6 import/export statements in non-ES6 files
              // (e.g. in CommonJS modules)
              // without getting the "'import' and 'export' may appear only with 'sourceType: module'" error
              sourceType: 'module',
            },
          },
        },
      });
      config.module.rules.push({
        test: /\.cjs$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        type: 'commonjs',
      });
      return config;
    },
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    experimental: { esmExternals: true },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  })
);
