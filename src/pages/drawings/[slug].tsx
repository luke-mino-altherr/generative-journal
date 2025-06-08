import React, { useEffect, useState } from 'react';

import { Sketch } from '@/components/p5/Sketch';
import { useDarkMode } from '@/hooks/darkMode';
import { useScreenDimensions } from '@/hooks/screenDimensions';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { getDrawingFromSlug, getDrawings } from '@/utils/mdx';

interface IDrawingProp {
  data: any;
}

interface IDrawingProps {
  post: IDrawingProp;
}

const getDynamicComponent = (c: string) => import(`@/sketch/${c}`);

export default function Drawing({ post: { data } }: IDrawingProps) {
  const [dynamicComponent, setDynamicComponent] = useState<any | undefined>(undefined);
  const { width, height } = useScreenDimensions();
  const darkMode = useDarkMode();

  useEffect(() => {
    getDynamicComponent(data.slug).then((c) => {
      setDynamicComponent(c);
    });
  }, []);

  return (
    <React.Fragment>
      <Main
        hideFooter
        transparentHeader
        meta={
          <Meta
            title={data.title}
            description={data.description}
            type="article"
            publishedTime={data.publishedOn}
            keywords={['generative art', 'creative coding', 'p5.js', 'digital art']}
          />
        }
      >
        <div>
          <div className="fixed bottom-4 left-4 max-w-sm">
            <h3 className="text-sm uppercase text-gray-800 dark:text-gray-300">{data.title}</h3>
            <h4 className="text-xs font-light text-gray-700 dark:text-gray-400">
              {data.publishedOn}
            </h4>
            <span className="mb-0 mt-2 text-xs text-gray-500 dark:text-gray-500">
              {data.description}
            </span>
          </div>
          <div className="content">
            {dynamicComponent !== undefined && (
              <Sketch
                SketchComponent={dynamicComponent.default}
                width={width}
                height={height}
                fullScreen={true}
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </Main>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }: any) {
  // fetch the particular file based on the slug
  const { slug } = params;
  const { data } = await getDrawingFromSlug(slug);

  return {
    props: {
      post: {
        data,
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getDrawings().map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: false,
  };
}
