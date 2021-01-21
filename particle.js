
class Particle {
  constructor(x, y, rad, col, type) {
    this.type = type;
    this.pos = createVector(x, y);
    // this.vel = createVector();
    this.vel = p5.Vector.random2D().mult(10);
    this.acc = createVector();
    this.rad = rad;
    this.col = col;
    this.life = 1;
  }

  follow ( x, y ) {
    let tar = createVector(x, y);
    this.vel = p5.Vector.sub( tar, this.pos );
    let d = p5.Vector.dist(tar, this.pos);
    if ( d >= 5 ) {
      this.vel.setMag(5);
    } else {
      this.vel.setMag(0);
    }
  }

  applyForce(force) {
    this.acc.add( force );
    // this.acc = createVector();
  }

  update() {
    this.vel.add( this.acc );
    this.pos.add( this.vel );
    if ( this.type == TRAIL ) {
      this.life -= 0.05;
    }
  }

  show() {
    noStroke();
    // let c = random(100, 255);
    fill(this.col, 255, 255, this.life );
    circle(this.pos.x, this.pos.y, this.rad);
  }
}
