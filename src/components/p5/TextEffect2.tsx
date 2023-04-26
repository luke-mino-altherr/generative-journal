import dynamic from 'next/dynamic';
import type p5Types from 'p5';
import { Vector } from 'p5';
import React from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
}); // Import this for typechecking and intellisense

type ITextEffectProps = {
  body: string;
};

const TextEffect: React.FC<ITextEffectProps> = (props: ITextEffectProps) => {
  let font: p5Types.Font | undefined;
  let letters: Letter[] = [];
  const density = 2.5;
  const fontSize = 64;
  let ribbonWidth = 92;
  let shapeColor: p5Types.Color;
  let pathSampleFactor = 0.1;

  class Letter {
    char: string;

    x: number;

    y: number;

    constructor(char: string, x: number, y: number) {
      this.char = char;
      this.x = x;
      this.y = y;
    }

    draw = (p5: p5Types) => {
      const path = font!.textToPoints(this.char, this.x, this.y, fontSize, {
        sampleFactor: pathSampleFactor,
      });
      p5.stroke(shapeColor);

      for (let d = 0; d < ribbonWidth; d += density) {
        p5.beginShape();

        for (let i = 0; i < path.length; i += 1) {
          const pos = path[i];
          const nextPos = path[i + 1];

          if (nextPos) {
            const p0 = p5.createVector(pos.x, pos.y);
            const p1 = p5.createVector(nextPos.x, nextPos.y);
            const v = Vector.sub(p1, p0);
            v.normalize();
            v.rotate(p5.HALF_PI);
            v.mult(d);
            const pneu = Vector.add(p0, v);
            p5.curveVertex(pneu.x, pneu.y);
          }
        }

        p5.endShape(p5.CLOSE);
      }
    };
  }

  const initializeLetters = () => {
    letters = [];
    const chars = props.body.split('');

    let x = 0;
    for (let i = 0; i < chars.length; i += 1) {
      if (i > 0) {
        const charsBefore = props.body.substring(0, i);
        // @ts-ignore
        x = font!.textBounds(charsBefore, 0, 0, fontSize).w;
      }
      const newLetter = new Letter(chars[i]!, x, 0);
      letters.push(newLetter);
    }
  };

  const preload = (p5: p5Types) => {
    font = p5.loadFont(
      'https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf'
    );
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.noFill();
    p5.strokeWeight(1);
    shapeColor = p5.color(0);
    initializeLetters();
  };

  const draw = (p5: p5Types) => {
    p5.background(255);
    p5.translate(100, p5.height * 0.75);

    pathSampleFactor = 0.1 * p5.pow(0.02, p5.mouseX / p5.width);
    ribbonWidth = p5.map(p5.mouseY, 0, p5.height, 1, 50);

    for (let i = 0; i < letters.length; i += 1) {
      letters[i]!.draw(p5);
    }
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export { TextEffect };
