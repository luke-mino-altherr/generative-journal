import { WordParticle } from '@/components/p5';
import { useDarkMode } from '@/hooks/darkMode';
import { useScreenDimensions } from '@/hooks/screenDimensions';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const screenDimensions = useScreenDimensions();
  const darkMode = useDarkMode();

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      {screenDimensions.width !== 0 && (
        <WordParticle
          width={screenDimensions.width}
          height={screenDimensions.height}
          fullScreen={true}
          darkMode={darkMode}
        />
      )}
    </Main>
  );
};

export default Index;
