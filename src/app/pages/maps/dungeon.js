import { noise } from 'perlin';

export default class Dungeon {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    noise.seed(520);

    this.map = this.generate(width, height);
  }

  getTile(x, y) {
    if( x < 0) x= 0;
    if( y < 0) y= 0;
    if(x > this.height -1) x = this.height -1;
    if(x > this.width -1) x = this.width -1;
    return this.map[(y * this.width) + x];
  }

  generate(width, height) {
    let map = [];

    for (let c=0; c < width * height; c++) {
      map.push(20);
    }

    for (let x=0; x < width; x++) {
      for (let y=0; y < height; y++) {
        let tile = Math.round(noise.perlin2(x / 20, y / 20) * 40);

        if(tile < 0) tile = 163;
        if(tile > 4 && tile < 9) tile = 176;
        if(tile < 3) tile = 59;
        if(tile > 10 && tile < 50) tile = 20;

        map[(y * width) + x] = tile;
      }
    }

    return map;
  }
}
