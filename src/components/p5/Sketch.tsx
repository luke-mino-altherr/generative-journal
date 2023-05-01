import { useP5 } from '@/hooks/p5';

interface Props {
  SketchComponent: any;
  width: number;
  height: number;
  fullScreen: boolean;
  darkMode?: boolean;
}

const Sketch = ({
  SketchComponent,
  width,
  height,
  fullScreen,
  darkMode,
}: Props) => {
  console.log('boo', SketchComponent, width, height, fullScreen, darkMode);
  const [setRef] = useP5((p5) => {
    console.log('hi', SketchComponent, p5, width, height, fullScreen, darkMode);
    return SketchComponent(p5, width, height, fullScreen, darkMode);
  });
  return <div ref={setRef}></div>;
};

export { Sketch };
