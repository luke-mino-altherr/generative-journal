import { Astroid } from './astroid';

export class AstroidSystem {
  astroids: Astroid[];

  constructor(p5: any) {
    this.astroids = [];
    for (let i = 0; i < 10; i += 1) {
      this.astroids.push(new Astroid(p5));
    }
  }

  updateCollisions(xMin: number, xMax: number, yMin: number, yMax: number) {
    this.astroids.forEach((astroid) => {
      astroid.collisionDetection(xMin, xMax, yMin, yMax);
    });
  }

  update(p5: any) {
    this.astroids.forEach((astroid) => {
      astroid.update(p5);
    });
  }
}
