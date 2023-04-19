import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getArticles } from '@/utils/mdx';

const Blog = ({ posts }: any) => {
  return (
    <Main meta={<Meta title="Blog" description="Blog posts" />}>
      <h2 className="text-center text-xl">Posts</h2>
      {posts.map((post: any) => (
        <div className="my-4 px-2 py-1" key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.data.title}</Link>
        </div>
      ))}
    </Main>
  );
};

export default Blog;

export async function getStaticProps() {
  return {
    props: {
      posts: getArticles(),
    },
  };
}
