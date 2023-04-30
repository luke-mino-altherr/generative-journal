import type p5Types from 'p5';
import type { Vector } from 'p5';

const Sketch = (p5: p5Types, width: number, height: number) => {
  const backgroundColor = 0;

  let location: Vector;

  let velocity: Vector;

  let acceleration: Vector;

  const applyDrag = (vector: Vector, c: number) => {
    const speed = vector.mag();
    const dragMagnitude = c * speed * speed > c ? c * speed * speed : c;

    const drag = vector.copy();
    drag.normalize();
    drag.mult(dragMagnitude);
    drag.mult(-1);

    if (vector.mag() > c) vector.add(drag);
    else vector.x = 0;
  };

  p5.setup = () => {
    p5.createCanvas(width, height);
    location = p5.createVector(width / 2, height / 2);
    velocity = p5.createVector(0, 0);
    acceleration = p5.createVector(0, 0);
  };

  p5.draw = () => {
    p5.background(backgroundColor);
    location.add(velocity);
    velocity.add(acceleration);
    applyDrag(velocity, 0.01);
    applyDrag(acceleration, 0.08);
    velocity.limit(25);

    if (location.x > width) {
      location.x = 0;
    } else if (location.x < 0) {
      location.x = width;
    }

    if (p5.mouseIsPressed) {
      const toAdd = p5.createVector(2, 0);
      acceleration = acceleration.add(toAdd);
    }

    p5.rect(location.x, location.y, 30, 10);
  };
};

export default Sketch;
