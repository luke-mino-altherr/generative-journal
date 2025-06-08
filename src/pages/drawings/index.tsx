import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortBy } from 'lodash';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useMemo, useState } from 'react';

import { Sketch } from '@/components/p5/Sketch';
import { useDarkMode } from '@/hooks/darkMode';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { trackNavigationClick } from '@/utils/googleAnalytics';
import { getDrawings } from '@/utils/mdx';

const getDynamicComponent = (c: string) => import(`@/sketch/${c}`).then((mod) => mod.default);

const Drawings = ({ posts }: any) => {
  const [dynamicComponents, setDynamicComponents] = useState<Map<string, any> | undefined>(
    undefined
  );

  const darkMode = useDarkMode();

  const handleDrawingClick = (drawingSlug: string) => {
    trackNavigationClick(`drawing_thumbnail_${drawingSlug}`);
  };

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
      <h2 className="text-center font-serif text-2xl uppercase tracking-wide">Drawings</h2>
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
                darkMode={darkMode}
              />
              <div className="grid grid-cols-4 pt-2 ">
                <div className="col-span-3">
                  <h3 className="text-sm uppercase">{post.data.title}</h3>
                  <h4 className="text-xs font-extralight text-gray-700 dark:text-gray-400">
                    {post.data.publishedOn}
                  </h4>
                </div>
                <div className="text-right">
                  <Link
                    href={`/drawings/${post.data.slug}`}
                    className="border-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                    onClick={() => handleDrawingClick(post.data.slug)}
                  >
                    <FontAwesomeIcon icon={faExpand} size="sm" />
                  </Link>
                </div>
              </div>
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
