import type p5Types from 'p5';
import type { Vector } from 'p5';

class SlowMorphingEllipse {
  location: Vector;

  velocity: Vector;

  velocityMultiplier = 2;

  floor = 100;

  constructor(p5: p5Types) {
    const x = p5.randomGaussian(p5.width / 2, p5.width / 8);
    const y = p5.randomGaussian(p5.height / 2, p5.height / 8);
    const z = p5.randomGaussian(255 / 2, 255 / 8);

    this.location = p5.createVector(x, y, z);
    this.velocity = p5.createVector(
      p5.random(-1, 1) * this.velocityMultiplier,
      p5.random(-1, 1) * this.velocityMultiplier,
      p5.random(-1, 1) * this.velocityMultiplier
    );
  }

  update(p5: p5Types) {
    this.location.add(this.velocity);
    if (this.location.x < this.floor || this.location.x > p5.width) {
      this.velocity.x *= -1;
    }
    if (this.location.y < this.floor || this.location.y > p5.height - 20) {
      this.velocity.y *= -1;
    }
    if (this.location.z < this.floor || this.location.z > 255) {
      this.velocity.z *= -1;
    }
  }

  draw(p5: p5Types) {
    p5.push();
    SlowMorphingEllipse.drawWithReverb(
      p5,
      this.location.x,
      this.location.y,
      this.location.z
    );
    p5.pop();
  }

  static drawWithReverb(p5: p5Types, x: number, y: number, z: number) {
    for (let i = 0; i < 255; i += 5) {
      p5.push();
      p5.stroke(z - i);
      p5.ellipse(p5.width / 2, p5.height / 2, x - i, y - i);
      p5.pop();
    }
  }
}

const Sketch = (
  p5: p5Types,
  width: number,
  height: number,
  fullScreen: boolean,
  darkMode: boolean
) => {
  const backgroundColor = darkMode ? 0 : 255;

  let ellipses: SlowMorphingEllipse[] = [];

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);
    if (fullScreen) renderer.position(0, 0).style('z-index', '-1');
    p5.fill(backgroundColor, 0, 0, 0);
    p5.background(backgroundColor);

    for (let i = 0; i < 3; i += 1) {
      ellipses.push(new SlowMorphingEllipse(p5));
    }
    ellipses = ellipses.sort((a, b) => a.location.z - b.location.z);
  };

  p5.draw = () => {
    p5.background(backgroundColor);

    ellipses.forEach((ellipse) => {
      ellipse.update(p5);
      // ellipses = ellipses.sort((a, b) => a.location.z - b.location.z);
      ellipse.draw(p5);
    });
  };
};

export default Sketch;
