import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';

import * as components from '@/components/p5';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getArticleFromSlug, getArticles } from '@/utils/mdx';

interface IBlogProp {
  source: MDXRemoteSerializeResult;
  data: any;
}

interface IBlogProps {
  post: IBlogProp;
}

export default function Blog({ post: { source, data } }: IBlogProps) {
  return (
    <React.Fragment>
      <Main
        meta={
          <Meta
            title={`${data.title} - Luke Mino-Altherr`}
            description={`${data.description} - Written by Luke Mino-Altherr, software engineer and creative coder.`}
            type="article"
            publishedTime={data.publishedOn}
            keywords={[
              'Luke Mino-Altherr',
              'software engineer',
              'creative coding',
              'generative art',
            ]}
          />
        }
      >
        <div>
          <h1>{data.title}</h1>
          <div
            className="mb-4 text-sm text-gray-600 dark:text-gray-400"
            style={{ display: 'none' }}
          >
            By Luke Mino-Altherr
          </div>
          <div className="content">
            <MDXRemote {...source} components={components} />
          </div>
        </div>
      </Main>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }: any) {
  // fetch the particular file based on the slug
  const { slug } = params;
  const { content, data } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      // rehypePlugins: [
      //   rehypeSlug,
      //   [
      //     rehypeAutolinkHeadings,
      //     {
      //       properties: { className: ['anchor'] },
      //     },
      //     { behaviour: 'wrap' },
      //   ],
      //   rehypeHighlight,
      //   rehypeCodeTitles,
      // ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        data,
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getArticles().map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: false,
  };
}
