import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { trackOutboundLink } from '@/utils/googleAnalytics';
import { getProjectFromSlug, getProjects } from '@/utils/mdx';

interface IProjectData {
  slug: string;
  description: string;
  tags: string[];
  dateBuilt: string;
  demoSite?: string;
  image?: string;
}

interface IProjectProps {
  post: {
    source: MDXRemoteSerializeResult;
    data: IProjectData;
  };
}

export default function Project({ post: { source, data } }: IProjectProps) {
  const handleOutboundClick = (url: string, label: string) => {
    trackOutboundLink(url, label);
  };

  const projectTitle = data.slug.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <React.Fragment>
      <Main meta={<Meta title={projectTitle} description={data.description} />}>
        <article className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">{projectTitle}</h1>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">{data.description}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Built: {new Date(data.dateBuilt).getFullYear()}
              </span>
              {data.demoSite && (
                <a
                  href={data.demoSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleOutboundClick(data.demoSite!, data.slug)}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View Demo →
                </a>
              )}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote {...source} />
          </div>
        </article>
      </Main>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;
  const { content, data } = getProjectFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        data,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = getProjects();
  const paths = projects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
