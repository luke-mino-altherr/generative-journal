import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = ({ posts }: any) => {
  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>

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
  const getPosts = () => {
    const dirFiles = fs.readdirSync(
      path.join(process.cwd(), 'src', 'pages', 'blog'),
      {
        withFileTypes: true,
      }
    );

    const posts = dirFiles
      .map((file) => {
        if (!file.name.endsWith('.mdx')) return undefined;

        const fileContent = fs.readFileSync(
          path.join(process.cwd(), 'src', 'pages', 'blog', file.name),
          'utf-8'
        );
        const { data, content } = matter(fileContent);

        const slug = file.name.replace(/.mdx$/, '');
        return { data, content, slug };
      })
      .filter((post) => post);

    return posts;
  };
  return {
    props: {
      posts: getPosts(),
    }, // will be passed to the page component as props
  };
}
