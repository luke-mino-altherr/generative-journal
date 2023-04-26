import dynamic from 'next/dynamic';
import type p5Types from 'p5';
// import type { Vector } from 'p5';
import React from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
}); // Import this for typechecking and intellisense

type IDrawingProps = {
  width: number;
  height: number;
};

const Drawing: React.FC<IDrawingProps> = ({ width, height }) => {
  const setup = (p5: p5Types) => {
    p5.createCanvas(width, height);
    // const renderer = p5.createCanvas(width, height);
    // renderer.position(0, 0).style('z-index', '-1');
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export { Drawing };
