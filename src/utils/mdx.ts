import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const articlesPath = path.join(process.cwd(), 'src', 'articles');
const drawingsPath = path.join(process.cwd(), 'src', 'drawings');

export function getSlug(filePath: string) {
  const pathContent = filePath.split('/');
  const fileName = pathContent[pathContent.length - 1];
  const slug = fileName!.split('.')[0];
  return slug;
}

const getMdxContentFromPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const slug = getSlug(filePath);
  return { data, content, slug };
};

const getArticleFromSlug = (slug: string) => {
  const filePath = path.join(articlesPath, `${slug}.mdx`);
  return getMdxContentFromPath(filePath);
};

const getArticles = () => {
  const paths = sync(`${articlesPath}/*.mdx`);
  return paths.map((p: string) => {
    return getMdxContentFromPath(p);
  });
};

const getDrawings = () => {
  const paths = sync(`${drawingsPath}/*.mdx`);
  return paths.map((p: string) => {
    return getMdxContentFromPath(p);
  });
};

export { getArticleFromSlug, getArticles, getDrawings };
