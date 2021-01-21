/*
	@name : Fireworks simulation in p5.js
	@author : Ruhail Mir
	@instagram: ruhailmir
	@twitter: ruhailmir77
*/

let fireworks = [];
// to start the animation on mouse click.
let commence = false;
// const, whether the Particle shoud have trials.
const TRAIL = 1;

// initialize all the vars.
function setup() {
	// for fullscreen
	// fullscreen();

	// custom size
	// createCanvas(1366, 764);
	// createCanvas(600, 500);

	// responsive size.
	createCanvas(window.innerWidth, window.innerHeight);

	// to get nice colors.
	colorMode(HSB);
	// slow down the animation.
	frameRate(46);

	//
	background(244, 0, 0);
	noStroke();
	fill(244);
	textSize(20);
	text("Click to Begin!", (width/2) - (70), height/2);
}

function mousePressed() {
	// start the animation on mouse click.
	// for both starting and stopping.
	// commence = !commence;
	// for starting only.
	commence = true;
}

function draw() {

	if ( commence ) {
		// redraw the canvas every frame.
		// with alpha, to make it appear smoother with trials.
		background(0, 0, 0, .3);

		if ( frameCount % 20 == 0 ) {
			for ( let i = 0; i < 1; i++ ) {
				let t = createVector(random(width), 100);
				let firework = new Firework( random (width), height - 20, TRAIL, t );
				fireworks.push( firework );
			}
		}

		for ( let i = 0; i < fireworks.length; i++ ) {
			let firework = fireworks[i];
			firework.show();
			firework.trail();
			firework.update();
			firework.tar();
			firework.grav(createVector( 0, 0.007 ));
			firework.boomMe();
		}

		// Free the memory...
		if ( fireworks.length > 10 ) {
			fireworks = fireworks.splice(1, fireworks.length);
		}
	}
}
