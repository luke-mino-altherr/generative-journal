import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const articlesPath = path.join(process.cwd(), 'src', 'articles');

export function getSlug(filePath: string) {
  const pathContent = filePath.split('/');
  const fileName = pathContent[pathContent.length - 1];
  const slug = fileName!.split('.')[0];
  return slug;
}

const getArticleFromPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const slug = getSlug(filePath);
  return { data, content, slug };
};

const getArticleFromSlug = (slug: string) => {
  const filePath = path.join(articlesPath, `${slug}.mdx`);
  return getArticleFromPath(filePath);
};

const getArticles = () => {
  const paths = sync(`${articlesPath}/*.mdx`);
  return paths.map((p: string) => {
    return getArticleFromPath(p);
  });
};

export { getArticleFromSlug, getArticles };
