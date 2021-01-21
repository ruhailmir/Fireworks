let fireworks = [];
let commence = false;
const TRAIL = 1;

function setup(){
	createCanvas(1366, 764);
	// createCanvas(600, 500);
	colorMode(HSB);
	frameRate(46);
}

function mousePressed() {
	commence = !commence;
}

function draw() {
	background(0, 0, 0, .3);

	if ( commence ) {
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

		if ( fireworks.length > 10 ) {
			fireworks = fireworks.splice(1, fireworks.length);
		}
	}
}
