import { useP5 } from '@/hooks/p5';
import WordParticleSketch from '@/sketch/WorldParticle';

interface WordParticleProps {
  width: number;
  height: number;
  fullScreen: boolean;
  darkMode: boolean;
}

const WordParticle = ({
  width,
  height,
  fullScreen,
  darkMode,
}: WordParticleProps) => {
  const [setRef] = useP5((p5) =>
    WordParticleSketch(p5, width, height, fullScreen, darkMode)
  );
  return <div ref={setRef}></div>;
};

export { WordParticle };
