import dynamic from 'next/dynamic';
import type p5Types from 'p5';
import type { Vector } from 'p5';
// import type { Vector } from 'p5';
import React from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
}); // Import this for typechecking and intellisense

type IDrawingProps = {
  width: number;
  height: number;
};

const CarAccDemo: React.FC<IDrawingProps> = ({ width, height }) => {
  let location: Vector;

  let velocity: Vector;

  let acceleration: Vector;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    location = p5.createVector(width / 2, height / 2);
    velocity = p5.createVector(0, 0);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    location = location.add(velocity);
    velocity = velocity.add(acceleration);

    p5.rect(location.x, location.y, 30, 10);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export { CarAccDemo };
