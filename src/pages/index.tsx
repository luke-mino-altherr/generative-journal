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
          title={AppConfig.title}
          description={AppConfig.description}
          canonical={AppConfig.seo.siteUrl}
          keywords={['software engineer', 'portfolio', 'san francisco']}
        />
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="order-2 w-full items-center md:order-1 md:w-1/2">
          <p className="font-medium">Hi, I&apos;m Luke.</p>
          <p>
            I&apos;m a <span className="font-medium">software engineer</span>,{' '}
            <span className="font-medium">musician</span>, and{' '}
            <span className="font-medium">artist</span> based in{' '}
            <span className="font-medium">San Francisco</span>.
          </p>
          <p>
            I&apos;ve spent the last several years leading teams and building full-stack systems for
            data-intensive and user-focused products.
          </p>

          <p>
            Most recently, from 2022 to 2025, I worked as a{' '}
            <span className="font-medium">Staff Software Engineer</span> at{' '}
            <a
              href="https://www.therounds.co"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick('https://www.therounds.co', 'The Rounds')}
            >
              The Rounds
            </a>
            , a sustainable food delivery service that was recently acquired by{' '}
            <a
              href="https://www.misfitsmarket.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick('https://www.misfitsmarket.com', 'Misfits Market')}
            >
              Misfits Market
            </a>
            . Before that, from 2017 to 2022, I was a{' '}
            <span className="font-medium">Lead Software Engineer</span> at{' '}
            <a
              href="https://www.known.is"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleOutboundClick('https://www.known.is', 'Known')}
            >
              Known
            </a>
            , where I built data products that helped drive advertising efficiency in the linear
            television space.
          </p>

          <p className="font-medium">
            I am currently seeking my next role where I can make an impact building thoughtful,
            human-centered applications.
          </p>
        </div>
        <div className="z-[1000] order-1 flex w-full items-center justify-center md:order-2 md:w-1/2">
          <img
            src="/assets/images/bio-1.JPG"
            alt="Picture of Luke"
            className="relative w-full max-w-md md:max-w-none"
          />
        </div>
      </div>
    </Main>
  );
};

export default Index;
