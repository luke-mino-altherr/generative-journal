import { sortBy } from 'lodash';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useMemo } from 'react';

import * as components from '@/components/p5';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getDrawings } from '@/utils/mdx';

const Drawings = ({ posts }: any) => {
  const sortedPosts = useMemo(() => {
    return sortBy(posts, 'data.publishedOn').reverse();
  }, [posts]);
  return (
    <Main meta={<Meta title="Drawings" description="Generative drawings" />}>
      <h2 className="text-center text-xl">Drawings</h2>
      <div className="grid justify-center gap-3 pt-3 md:grid-cols-2">
        {sortedPosts.map((post: any) => (
          <div
            className="m-1 w-min border border-gray-300 p-4 dark:border-gray-400"
            key={post.slug}
          >
            <MDXRemote {...post.source} components={components} />
            <h3 className="pt-2 text-sm font-bold uppercase">
              {post.data.title}
            </h3>
            <h4 className="text-xs text-gray-700 dark:text-gray-400">
              {post.data.publishedOn}
            </h4>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Drawings;

export async function getStaticProps() {
  const posts = getDrawings();
  const parsedDrawings = await Promise.all(
    posts.map(async (p: any) => {
      const source = await serialize(p.content);
      return {
        ...p,
        source,
      };
    })
  );
  return {
    props: {
      posts: parsedDrawings,
    },
  };
}
