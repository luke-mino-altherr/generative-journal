import { useP5 } from '@/hooks/p5';
import Sketch from '@/sketch/CarAccDemo';

interface CarAccDemoProps {
  width: number;
  height: number;
}

const CarAccDemo = ({ width, height }: CarAccDemoProps) => {
  const [setRef] = useP5((p5) => Sketch(p5, width, height));
  return <div ref={setRef}></div>;
};

export { CarAccDemo };
