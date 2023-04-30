import type p5Types from 'p5';
import type { Vector } from 'p5';

const Sketch = (p5: p5Types, width: number, height: number) => {
  const backgroundColor = 0;

  let location: Vector;

  let velocity: Vector;

  let acceleration: Vector;

  p5.setup = () => {
    p5.createCanvas(width, height);
    location = p5.createVector(width / 2, height / 2);
    velocity = p5.createVector(0, 0);
  };

  p5.draw = () => {
    p5.background(backgroundColor);

    const mouseLocation = p5.createVector(p5.mouseX, p5.mouseY);
    const direction = mouseLocation.copy().sub(location);
    direction.normalize();
    direction.mult(0.5);

    acceleration = direction;

    velocity.add(acceleration);
    velocity.limit(3);
    location.add(velocity);

    p5.ellipse(location.x, location.y, 30, 30);
  };
};

export default Sketch;
