import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import { trackOutboundLink } from '@/utils/googleAnalytics';

const Index = () => {
  const handleOutboundClick = (url: string, label: string) => {
    trackOutboundLink(url, label);
  };

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} - Luke Mino-Altherr`}
          description={AppConfig.description}
          canonical={AppConfig.seo.siteUrl}
          keywords={[
            'Luke Mino-Altherr',
            'software engineer',
            'portfolio',
            'san francisco',
            'creative coding',
            'generative art',
            'musician',
            'artist',
            'Luke Mino-Altherr software engineer',
            'Luke Mino-Altherr San Francisco',
          ]}
        />
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="order-2 w-full items-center md:order-1 md:w-1/2">
          <p className="font-medium">Hi, I&apos;m Luke.</p>
          <p>
            I&apos;m a{' '}
            <span className="font-medium">backend and infrastructure engineering leader</span>,{' '}
            <span className="font-medium">musician</span>, and{' '}
            <span className="font-medium">artist</span> based in{' '}
            <span className="font-medium">San Francisco</span>.
          </p>
          <p>
            Today I lead backend engineering at{' '}
            <a
              href="https://www.comfy.org"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick('https://www.comfy.org', 'Comfy')}
            >
              Comfy
            </a>
            , the company behind ComfyUI, the open-source tool for visual and creative AI. My team
            builds the platform under Comfy Cloud, Comfy API, and Comfy Agent, turning creative AI
            workflows into reliable, scalable services.
          </p>
          <p>
            Before Comfy, I was a <span className="font-medium">Staff Software Engineer</span> at{' '}
            <a
              href="https://www.therounds.co"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick('https://www.therounds.co', 'The Rounds')}
            >
              The Rounds
            </a>{' '}
            (2022–2025) and a <span className="font-medium">Lead Software Engineer</span> at{' '}
            <a
              href="https://www.known.is"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick('https://www.known.is', 'Known')}
            >
              Known
            </a>{' '}
            (2017–2022), leading teams that built data-intensive, user-focused products.
          </p>
          <p>
            Find me on{' '}
            <a
              href="https://www.linkedin.com/in/luke-mino-altherr/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                handleOutboundClick('https://www.linkedin.com/in/luke-mino-altherr/', 'LinkedIn')
              }
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
        <div className="z-[1000] order-1 flex w-full items-center justify-center md:order-2 md:w-1/2">
          <img
            src="/assets/images/bio-1.JPG"
            alt="Luke Mino-Altherr, backend and infrastructure engineering leader, musician and artist"
            className="relative w-full max-w-md md:max-w-none"
          />
        </div>
      </div>
    </Main>
  );
};

export default Index;
