import dynamic from 'next/dynamic';
import type p5Types from 'p5';
import type { Vector } from 'p5';
import React from 'react';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
}); // Import this for typechecking and intellisense

type IWordParticleProps = {
  width: number;
  height: number;
};

class Particle {
  char: string;

  pos: Vector;

  vel: Vector;

  acc: Vector;

  lifespan: number;

  z: number;

  constructor(p5: p5Types, char: string, x: number, y: number) {
    this.char = char;
    this.lifespan = 300;
    this.z = p5.random();

    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector(p5.random(-0.1, 0.1), p5.random(0.5, 1));
    this.acc = p5.createVector(0, 3 / p5.map(this.z, 0, 1, 40, 80));
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 1;
  }

  display(p5: p5Types) {
    p5.textSize(p5.floor(p5.map(this.z, 0, 1, 2, 24)));
    p5.fill(p5.map(this.z, 0, 1, 0, 230));
    p5.text(this.char, this.pos.x, this.pos.y);
  }

  isOffscreen(p5: p5Types): boolean {
    return (
      this.pos.x < 0 ||
      this.pos.x > p5.width ||
      // this.pos.y < 0 ||
      this.pos.y > p5.height
    );
  }

  toDelete(p5: p5Types): boolean {
    return this.isOffscreen(p5) || this.lifespan < 0;
  }
}

const WordParticle: React.FC<IWordParticleProps> = ({ width, height }) => {
  const particles: Particle[] = [];

  let lastTimeExecuted = 0;

  let timeTolerance = 1000;

  const loadNewParticles = (p5: p5Types) => {
    const str: string = 'Helloworld';
    for (let i = 0; i < str.length; i += 1) {
      const p = new Particle(
        p5,
        str.charAt(i),
        p5.random(p5.width),
        p5.random(-300, 0)
      );
      particles.push(p);
    }
  };

  // See annotations in JS for more information
  const setup = (p5: p5Types) => {
    const renderer = p5.createCanvas(width, height);
    renderer.position(0, 0).style('z-index', '-1');
    p5.textFont('Nunito Sans');
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    if (p5.millis() - lastTimeExecuted > timeTolerance) {
      Array(40).fill(p5).forEach(loadNewParticles);
      lastTimeExecuted = p5.millis();
      timeTolerance = p5.random(400, 700);
    }

    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p!.update();
      p!.display(p5);

      // Remove particles that are offscreen
      if (p!.toDelete(p5)) {
        particles.splice(i, 1);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export { WordParticle };
