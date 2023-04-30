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
  const [setRef] = useP5((p5) =>
    SketchComponent(p5, width, height, fullScreen, darkMode)
  );
  return <div ref={setRef}></div>;
};

export { Sketch };
