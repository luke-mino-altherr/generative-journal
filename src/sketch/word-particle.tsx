import type p5Types from 'p5';
import type { Vector } from 'p5';

import { colors, hexToGrayscale } from '../config/theme';

class Particle {
  darkMode: boolean;

  char: string;

  pos: Vector;

  vel: Vector;

  ogVel: Vector;

  acc: Vector;

  x: number;

  y: number;

  z: number;

  constructor(p5: p5Types, char: string, darkMode: boolean) {
    this.darkMode = darkMode;

    this.char = char;
    this.z = p5.random();

    this.x = p5.random(p5.width);
    this.y = p5.random(-400, 0);

    this.pos = p5.createVector(this.x, this.y);
    this.vel = p5.createVector(p5.random(-0.1, 0.1), p5.random(0.5, 1));
    this.ogVel = this.vel.copy();
    this.acc = p5.createVector(0, 3 / p5.map(this.z, 0, 1, 40, 80));
  }

  setDarkMode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  resizeCanvas(p5: p5Types) {
    this.x = p5.random(p5.width);
  }

  update(p5: p5Types) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (this.isOffscreen(p5)) {
      this.pos = p5.createVector(this.x, this.y);
      this.vel = this.ogVel.copy();
    }
  }

  display(p5: p5Types) {
    p5.textSize(p5.floor(p5.map(this.z, 0, 1, 2, 24)));
    if (this.darkMode) {
      p5.fill(p5.map(this.z, 0, 1, 0, 230));
    } else {
      p5.fill(p5.map(this.z * -1, -1, 0, 100, 220));
    }
    p5.text(this.char, this.pos.x, this.pos.y);
  }

  isOffscreen(p5: p5Types): boolean {
    return this.pos.x < 0 || this.pos.x > p5.width || this.pos.y > p5.height;
  }
}

const Sketch = (
  p5: p5Types,
  width: number,
  height: number,
  fullScreen: boolean,
  darkMode: boolean
) => {
  const particles: Particle[] = [];
  const backgroundColor = darkMode
    ? hexToGrayscale(colors.background.dark)
    : hexToGrayscale(colors.background.light);

  const loadNewParticles = () => {
    const str: string = 'Helloworld';
    Array(100)
      .fill(p5)
      .forEach(() => {
        for (let i = 0; i < str.length; i += 1) {
          const p = new Particle(p5, str.charAt(i), darkMode);
          particles.push(p);
        }
      });
  };

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);
    if (fullScreen) renderer.position(0, 0).style('z-index', '-1');
    p5.textFont('Nunito Sans');
    loadNewParticles();
  };

  p5.draw = () => {
    p5.background(backgroundColor);

    // Update and display all particles
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p!.update(p5);
      p!.display(p5);
    }
  };

  p5.windowResized = () => {
    if (fullScreen) p5.resizeCanvas(window.innerWidth, window.innerHeight);
    particles.forEach((particle) => particle.resizeCanvas(p5));
  };
};

export default Sketch;
