import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { trackOutboundLink } from '@/utils/googleAnalytics';
import { getProjects } from '@/utils/mdx';

interface IProject {
  slug: string;
  data: {
    slug: string;
    description: string;
    tags: string[];
    dateBuilt: string;
    demoSite?: string;
    image?: string;
  };
  content: string;
}

interface IProjectsProps {
  projects: IProject[];
}

const Projects = ({ projects }: IProjectsProps) => {
  const handleOutboundClick = (url: string, label: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <Main meta={<Meta title="Projects" description="Software projects and experiments" />}>
      <h2 className="text-center font-serif text-2xl uppercase tracking-wide">Software</h2>
      <div className="grid justify-center gap-3 pt-3 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="min-w-80 m-1 flex-col items-center justify-center border border-gray-300 p-4 dark:border-gray-400"
          >
            {project.data.image && (
              <div className="mb-4">
                <img
                  src={project.data.image}
                  alt={project.slug}
                  className="h-48 w-full object-cover object-left-top"
                />
              </div>
            )}

            <div className="pt-2">
              <div className="mb-2 flex items-start justify-between">
                <Link href={`/software/${project.slug}`}>
                  <h3 className="text-sm uppercase hover:text-gray-700 dark:hover:text-gray-300">
                    {project.slug.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </h3>
                </Link>
                {project.data.demoSite && (
                  <a
                    href={project.data.demoSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleOutboundClick(project.data.demoSite!, project.slug)}
                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    View Demo →
                  </a>
                )}
              </div>

              <h4 className="mb-2 text-xs font-extralight text-gray-700 dark:text-gray-400">
                Built: {new Date(project.data.dateBuilt).getFullYear()}
              </h4>
              <p className="mb-2 text-xs text-gray-600 dark:text-gray-300">
                {project.data.description}
              </p>

              <div className="mb-2 flex flex-wrap gap-1">
                {project.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
};

export async function getStaticProps() {
  const projects = getProjects();

  // Sort projects by date built (newest first)
  const sortedProjects = projects.sort(
    (a, b) => new Date(b.data.dateBuilt).getTime() - new Date(a.data.dateBuilt).getTime()
  );

  return {
    props: {
      projects: sortedProjects,
    },
  };
}

export default Projects;
