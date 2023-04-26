import dynamic from 'next/dynamic';
import type p5Types from 'p5';
import React from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
}); // Import this for typechecking and intellisense

type ITextEffectProps = {
  body: string;
};

const RotatingText: React.FC<ITextEffectProps> = (props: ITextEffectProps) => {
  let font: p5Types.Font | undefined;

  const preload = (p5: p5Types) => {
    font = p5.loadFont(
      'https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf'
    );
  };

  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
    p5.textFont(font!, 64);
    p5.textSize();
    p5.textAlign(p5.CENTER, p5.CENTER);
  };

  const draw = (p5: p5Types) => {
    p5.background(p5.color(255));
    const time = p5.millis();
    p5.rotateX(time / 1000);
    p5.rotateZ(time / 1234);
    p5.fill(0).strokeWeight(0);
    p5.text(props.body, 0, 0);
    p5.fill(0, 102, 153, 51);
    p5.text(props.body, 5, 7);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export { RotatingText };
