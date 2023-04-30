import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import * as components from '@/components/p5';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getDrawings } from '@/utils/mdx';

const Drawings = ({ posts }: any) => {
  return (
    <Main meta={<Meta title="Drawings" description="Generative drawings" />}>
      <h2 className="text-center text-xl">Drawings</h2>
      {posts.map((post: any) => (
        <div className="my-4 px-2 py-1" key={post.slug}>
          <h3>{post.data.title}</h3>
          <h4>{post.data.publishedOn}</h4>
          <MDXRemote {...post.source} components={components} />
        </div>
      ))}
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
