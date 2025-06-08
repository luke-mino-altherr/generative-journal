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
          <div key={project.slug} className="border border-gray-300 p-6 dark:border-gray-400">
            <div className="mb-4">
              <Link href={`/projects/${project.slug}`}>
                <h2 className="text-text-light dark:text-text-dark mb-2 text-lg font-semibold hover:text-gray-700 dark:hover:text-gray-300">
                  {project.slug.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-300">{project.data.description}</p>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Built: {new Date(project.data.dateBuilt).getFullYear()}
              </span>
              {project.data.demoSite && (
                <a
                  href={project.data.demoSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleOutboundClick(project.data.demoSite!, project.slug)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  View Demo →
                </a>
              )}
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
