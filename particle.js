// The Particle class.
// for creating individual Particles.
// takes (x, y) -> position,
// radius, color and type ( TRAIL or Other arbitraty number );
class Particle {
  constructor(x, y, rad, col, type) {
    this.type = type;
    this.pos = createVector(x, y);
    // give each Particle a random velocity.
    // random2D returns a unit vector
    // so it appear in a perfect circle when the Particles burst at top.
    // multiplying the vector to make then quickly move out from the center.
    this.vel = p5.Vector.random2D().mult(10);
    this.acc = createVector();
    this.rad = rad;
    this.col = col;
    // life is just to make them fade gradually when they move out from the center.
    this.life = 1;
  }

  follow ( x, y ) {
    // make one Particle follow other.
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
    // apply a force like gravity or acceletation.
    this.acc.add( force );
  }

  update() {
    this.vel.add( this.acc );
    this.pos.add( this.vel );
    if ( this.type == TRAIL ) {
      this.life -= 0.05;
    }
  }

  show() {
    // show the Particle.
    noStroke();
    fill(this.col, 255, 255, this.life );
    circle(this.pos.x, this.pos.y, this.rad);
  }


  // 
}
