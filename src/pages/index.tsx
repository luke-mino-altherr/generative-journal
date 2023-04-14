import { WordParticle } from '@/components/WordParticle';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <h1>Luke Mino-Altherr</h1>
      <WordParticle />
    </Main>
  );
};

export default Index;
