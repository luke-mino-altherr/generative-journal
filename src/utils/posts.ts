import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

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

export { getPosts };
