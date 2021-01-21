

class Firework {
  constructor(x, y, type, target) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.tarVel = createVector();
    this.acc = createVector(0, -.3);
    this.trails = [];
    this.burst = [];
    this.target = target;
    this.type = type;
    this.rad = random(3, 13);
    this.radT = this.rad;
    this.c = random(255);

    if ( type == TRAIL ) {
      for ( let i = 0; i < this.rad; i++ ) {
        // this.radT *= .7;
        this.trails.push( new Particle (this.pos.x, this.pos.y, this.radT, this.c ));
        this.radT -= .8;
      }
    }
  }

  boomMe() {
    // console.log( this.vel.mag() );
    if ( this.vel.mag() <= .1 ) {
      this.trails = [];

      for ( let i = 0; i < floor(random(50, 200)); i++ ) {
        let c = random() <= .5 ? 255 : this.c;
        let p = new Particle(this.pos.x, this.pos.y, random(2, 5), c, this.type);
        this.burst.push( p );
      }
    }
  }

  trail () {
    for ( let i = this.trails.length-1; i > 0; i-- ) {
      let top = this.trails[i-1];
      let next = this.trails[i];
      top.show();
      next.show();
      top.update();
      next.update();
      next.follow(top.pos.x, top.pos.y);
      top.follow( this.pos.x, this.pos.y );
    }
  }

  tar() {
    let tar = p5.Vector.sub(this.target, this.pos);
    this.tarVel.add( tar );
  }

  grav(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    let d = p5.Vector.dist(this.target, this.pos);
    if ( d >= 5 ) {
      this.tarVel.setMag(5);
    } else {
      this.tarVel.setMag(0);
    }
    this.pos.add( this.tarVel );
  }

  show() {
    if ( this.type == TRAIL ) {
      this.trail();
    } else {
      noStroke();
      fill(this.c, 255, 255 );
      circle( this.pos.x, this.pos.y, this.rad );
    }

    for ( let i = 0; i < this.burst.length; i++ ) {
      let b = this.burst[i];
      b.show();
      b.applyForce( p5.Vector.random2D ().mult(.2) );
      b.applyForce( createVector (0, 0.1) );
      b.update();
    }
    //
  }
}
