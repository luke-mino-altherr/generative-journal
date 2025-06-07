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
    output: 'export',
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
        type: 'javascript/auto',
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
