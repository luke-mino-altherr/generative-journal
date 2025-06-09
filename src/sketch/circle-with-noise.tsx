import type p5Types from 'p5';
import type { Vector } from 'p5';

import { colors, hexToGrayscale } from '@/config/theme';

class CircleWithNoise {
  diameter: number;

  center: Vector;

  location: Vector;

  location2: Vector;

  diameter2: number;

  angle: number;

  constructor(p5: p5Types) {
    this.diameter = p5.min(p5.width, p5.height) / 3;
    this.diameter2 = 0;
    this.angle = 0;
    this.center = p5.createVector(p5.width / 2, p5.height / 2);
    this.location = p5.createVector(
      p5.cos(this.angle) * this.diameter + this.center.x,
      p5.sin(this.angle) * this.diameter + this.center.y
    );
    this.location2 = p5.createVector();
  }

  update(p5: p5Types) {
    this.angle += 0.01;
    const noise = p5.noise(this.angle);
    this.diameter = p5.map(
      noise,
      0,
      1,
      p5.min(p5.width, p5.height) / 6,
      p5.min(p5.width, p5.height) / 3
    );
    this.diameter2 = p5.map(
      noise,
      0,
      1,
      p5.min(p5.width, p5.height) / 5,
      p5.min(p5.width, p5.height) / 2
    );
    this.location = p5.createVector(
      p5.cos(this.angle) * this.diameter + this.center.x,
      p5.sin(this.angle) * this.diameter + this.center.y
    );
    const noise2 = p5.map(p5.noise(this.angle), 0, 1, 0, 0.5);
    this.location2 = p5.createVector(
      p5.cos(this.angle + noise2) * this.diameter2 + this.center.x,
      p5.sin(this.angle + noise2) * this.diameter2 + this.center.y
    );
  }

  draw(p5: p5Types) {
    p5.stroke(p5.map(p5.cos(this.angle + p5.PI / 2 + p5.noise(this.angle)), -1, 1, 150, 255));
    p5.line(this.location.x, this.location.y, this.location2.x, this.location2.y);
  }
}

const Sketch = (
  p5: p5Types,
  width: number,
  height: number,
  fullScreen: boolean,
  darkMode: boolean
) => {
  const backgroundColor = darkMode
    ? hexToGrayscale(colors.background.dark)
    : hexToGrayscale(colors.background.light);

  const circles: CircleWithNoise[] = [];

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);
    if (fullScreen) renderer.position(0, 0).style('z-index', '-1');
    p5.fill(backgroundColor, 0, 0, 0);
    p5.stroke(255);
    p5.background(backgroundColor);

    circles.push(new CircleWithNoise(p5));
  };

  p5.draw = () => {
    circles.forEach((circle) => {
      circle.update(p5);
      circle.draw(p5);
    });
  };
};

export default Sketch;
