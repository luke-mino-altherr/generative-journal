import type p5Types from 'p5';
import type { Vector } from 'p5';

export class Vehicle {
  width: number;

  height: number;

  location: Vector;

  velocity: Vector;

  acceleration: Vector;

  mass: number;

  angle: number; // radians

  constructor(p5: p5Types, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.mass = 10;
    this.angle = 0;
    this.location = p5.createVector(width / 2, height / 2);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 0);
  }

  applyForce(vector: Vector) {
    const f = vector.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // eslint-disable-next-line class-methods-use-this
  applyDrag(vector: Vector, c: number) {
    const speed = vector.mag();
    const dragMagnitude = c * speed * speed;

    const drag = vector.copy();
    drag.mult(-1);
    drag.normalize();
    drag.setMag(dragMagnitude);

    // this.applyForce(drag);
    if (dragMagnitude > c) {
      vector.add(drag);
    } else {
      vector.x = 0;
      vector.y = 0;
    }
  }

  checkEdges() {
    if (this.location.x > this.width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = this.width;
    }
    if (this.location.y > this.height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = this.height;
    }
  }

  handleSteering(p5: p5Types) {
    if (p5.keyIsPressed) {
      if (p5.keyCode === p5.LEFT_ARROW) {
        this.angle -= 0.05;
      } else if (p5.keyCode === p5.RIGHT_ARROW) {
        this.angle += 0.05;
      }
    } else if (p5.mouseIsPressed) {
      const mouseLocation = p5.createVector(p5.mouseX, p5.mouseY);
      const direction = mouseLocation.copy().sub(this.location);
      this.angle = direction.heading();
    }
  }

  handleThrust(p5: p5Types) {
    if ((p5.keyIsPressed && p5.key === ' ') || p5.mouseIsPressed) {
      const toAdd = p5.createVector(Math.cos(this.angle), Math.sin(this.angle));
      toAdd.mult(2);
      this.velocity.add(toAdd);
    }
  }

  update(p5: p5Types) {
    this.checkEdges();
    this.handleSteering(p5);
    this.handleThrust(p5);

    this.applyDrag(this.velocity, 0.01);
    this.applyDrag(this.acceleration, 0.1);
    this.velocity.add(this.acceleration);
    this.velocity.limit(25);
    this.location.add(this.velocity);

    p5.push();
    p5.rectMode(p5.CENTER);
    p5.translate(this.location.x, this.location.y);
    p5.rotate(this.angle);
    p5.rect(0, 0, 30, 10);
    p5.pop();
  }
}
