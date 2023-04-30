import { sortBy } from 'lodash';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useMemo, useState } from 'react';

import { Sketch } from '@/components/p5/Sketch';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getDrawings } from '@/utils/mdx';

const getDynamicComponent = (c: string) =>
  import(`@/sketch/${c}`).then((mod) => mod.default);

const Drawings = ({ posts }: any) => {
  const [dynamicComponents, setDynamicComponents] = useState<
    Map<string, any> | undefined
  >(undefined);

  useEffect(() => {
    posts
      .reduce(async (acc: any, post: any) => {
        const component = await getDynamicComponent(post.data.slug);
        (await acc).set(post.data.slug, component);
        return acc;
      }, new Map())
      .then((map: any) => {
        setDynamicComponents(map);
      });
  }, [posts.data]);

  const sortedPosts = useMemo(() => {
    return sortBy(posts, 'data.publishedOn').reverse();
  }, [posts]);

  return (
    <Main meta={<Meta title="Drawings" description="Generative drawings" />}>
      <h2 className="text-center text-xl">Drawings</h2>
      <div className="grid justify-center gap-3 pt-3 md:grid-cols-2">
        {dynamicComponents &&
          sortedPosts.map((post: any) => (
            <div
              className="m-1 w-min border border-gray-300 p-4 dark:border-gray-400"
              key={post.slug}
            >
              <Sketch
                SketchComponent={dynamicComponents.get(post.data.slug)}
                width={300}
                height={300}
                fullScreen={false}
                darkMode={true}
              />
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
