import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getPosts } from '@/utils/posts';

const Blog = ({ posts }: any) => {
  return (
    <Main meta={<Meta title="Blog" description="Blog posts" />}>
      {posts.map((post: any) => (
        <div
          className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1"
          key={post.slug}
        >
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
      posts: getPosts(),
    },
  };
}
