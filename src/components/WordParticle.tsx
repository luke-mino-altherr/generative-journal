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
    this.lifespan = 2500;
    this.z = p5.floor(p5.random(8, 32));

    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector(p5.random(-0.1, 0.1), p5.random(0, 1));
    this.acc = p5.createVector(0, p5.random(0.01, 0.05) / (this.z / 10));
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 1;
  }

  display(p5: p5Types) {
    p5.textSize(this.z);
    p5.fill(p5.map(this.z, 0, 32, 0, 255));
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
}

const WordParticle: React.FC<IWordParticleProps> = ({ width, height }) => {
  const particles: Particle[] = [];

  let lastTimeExecuted = 0;

  let timeTolerance = 1000;

  const loadNewParticles = (p5: p5Types) => {
    const str: string = 'Hello world';
    for (let i = 0; i < str.length; i += 1) {
      const p = new Particle(
        p5,
        str.charAt(i),
        p5.random(p5.width),
        p5.random(-200, -50)
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
      timeTolerance = p5.random(300, 2000);
    }

    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p!.update();
      p!.display(p5);

      // Remove particles that are offscreen
      if (p!.isOffscreen(p5) || p!.lifespan < 0) {
        particles.splice(i, 1);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export { WordParticle };
