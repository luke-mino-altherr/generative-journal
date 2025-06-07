import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  return (
    <Main meta={<Meta title={AppConfig.title} description={AppConfig.description} />}>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="order-2 w-full items-center md:order-1 md:w-1/2">
          <p>Hi, I&apos;m Luke.</p>
          <p>
            I am a <span className="font-bold">software engineer</span>,{' '}
            <span className="font-bold">musician</span>, and{' '}
            <span className="font-bold">artist</span>.
          </p>
          <p>
            I am currently seeking work in{' '}
            <span className="font-bold">San Francisco, California</span>.
          </p>
          <p>
            Most recently, from 2022 to 2025, I worked as a{' '}
            <span className="font-bold">Staff Software Engineer</span> at{' '}
            <a href="https://www.therounds.co" target="_blank" rel="noopener noreferrer">
              The Rounds
            </a>
            , a sustainable food delivery service that was recently acquired by{' '}
            <a href="https://www.misfitsmarket.com" target="_blank" rel="noopener noreferrer">
              Misfits Market
            </a>
            . Before that, from 2017 to 2022, I was a{' '}
            <span className="font-bold">Lead Software Engineer</span> at{' '}
            <a href="https://www.known.is" target="_blank" rel="noopener noreferrer">
              Known
            </a>
            , where I built data products that helped drive advertising efficiency in the linear TV
            industry.
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
      <div className="flex flex-row items-center justify-center gap-8">
        <p></p>
      </div>
    </Main>
  );
};

export default Index;
