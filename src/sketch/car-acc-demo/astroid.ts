import type p5Types from 'p5';
import type { Vector } from 'p5';

export class Astroid {
  location: Vector;

  velocity: Vector;

  // acceleration: Vector;

  diameter: number;

  collisionDetected = false;

  constructor(p5: p5Types) {
    this.location = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.velocity = p5.createVector(p5.random(3), p5.random(3));
    // this.acceleration = p5.createVector(p5.random(0.1), p5.random(0.1));
    this.diameter = p5.random(10, 30);
  }

  draw(p5: p5Types) {
    if (this.collisionDetected) {
      p5.push();
      p5.fill(0, 255, 0);
      p5.ellipse(this.location.x, this.location.y, this.diameter);
      p5.pop();
    } else {
      p5.ellipse(this.location.x, this.location.y, this.diameter);
    }
  }

  checkEdges(p5: p5Types) {
    if (this.location.x > p5.width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = p5.width;
    }
    if (this.location.y > p5.height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = p5.height;
    }
  }

  update(p5: p5Types) {
    this.location.add(this.velocity);
    // this.velocity.add(this.acceleration);
    this.checkEdges(p5);
    this.draw(p5);
  }

  collisionDetection(xMin: number, xMax: number, yMin: number, yMax: number) {
    this.collisionDetected =
      this.location.x + this.diameter / 2 > xMin &&
      this.location.x - this.diameter / 2 < xMax &&
      this.location.y + this.diameter / 2 > yMin &&
      this.location.y - this.diameter / 2 < yMax;
  }
}
