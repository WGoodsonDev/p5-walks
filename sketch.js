let scaleFactor = 10;

let numWalks = 30;
let walkMinLength = 200;
let walkMaxLength = 240;
let walks = [];
let longestWalk;

let numStepsPerWalk = 0;

let animationSpeed = 1.0;

const stepMap = {
	0: 'u',
	1: 'd',
	2: 'l',
	3: 'r'
}

const opposites = {
	'u': 'd',
	'd': 'u',
	'l': 'r',
	'r': 'l'
}

const dXdY = {
	'u': {
		'dx': 0,
		'dy': -1
	},
	'd': {
		'dx': 0,
		'dy': 1
	},
	'l': {
		'dx': -1,
		'dy': 0
	},
	'r': {
		'dx': 1,
		'dy': 0
	},
}


function setup() {
	createCanvas(720, 720);
	colorMode(HSB, 100);
	background(0, 0, 10);
	// blendMode(SCREEN);
	newWalks();
}

function draw() {
	background(0, 0, 5);

	if(frameCount % 2 === 0){numStepsPerWalk += animationSpeed;}
	// const animT = map()
	// numStepsPerWalk = easeInSine()

	stroke(0, 0, 15);
	strokeWeight(1);

	// Draw grid lines
	// for(let i = 0; i <= width; i += scaleFactor){
	// 	line(i, 0, i, height);
	// }
	//
	// for(let i = 0; i <= height; i += yScl){
	// 	line(0, i, width, i);
	// }


	walks.forEach((walk, idx) => {
		let hue = map(idx, 0, walks.length, 0, 50);
		stroke(hue, 100, 100, 10);
		strokeWeight(2);
		walk.display(numStepsPerWalk);

		walk.drawOrigin();
	})

	textSize(24);
	fill(0, 0, 50);
	text(int(frameRate()), 10, height - 14);
}

function generateWalk(length){
	// Keep track of points visited by walk
	let current = [0, 0];
	let seen = [];
	seen.push([...current]);

	let walk = [];

	// Generate each step
	for(let i = 0; i < length; i++){
		// ATTEMPT A STEP
		// Get random integer in range [0, 3]
		let randResult = random([0, 1, 2, 3]);
		// Convert into new step character
		let newStep = stepMap[randResult];

		// Update current position
		let dx = dXdY[newStep]['dx'];
		let dy = dXdY[newStep]['dy'];

		current[0] += dx;
		current[1] += dy;

		// CHECK STEP ATTEMPT
		// Make sure this next step is not opposite to last step
		// (TODO) and isn't leading to a previously visited point
		while(newStep === opposites[walk[i-1]]){
			// Roll current position back one step
			current[0] -= dx;
			current[1] -= dy;

			// Get random integer in range [0, 3]
			randResult = round(random(3));
			// Convert into new step character
			newStep = stepMap[randResult];

			// Update current position
			dx = dXdY[newStep]['dx'];
			dy = dXdY[newStep]['dy'];
			current[0] += dx;
			current[1] += dy;

		}
		// Push new step into array to be returned
		walk.push(newStep);
		// Add current position to seen points
		seen.push([...current]);



	}

	return walk;
}

function newWalks(){
	walks = [];
	numStepsPerWalk = 0;
	for(let i = 0; i < numWalks; i++){
		const newWalk = new Walk(mouseX, mouseY, int(random(walkMinLength, walkMaxLength)));
		walks.push(newWalk);
	}

	// Find walkLength of longest walk for easing function
	let walkLengths = [];
	walks.forEach(walk => {
		walkLengths.push(walk.walkLength);
	});
	longestWalk = Math.max(...walkLengths);
	console.log(longestWalk);
}

function mouseClicked(){
	newWalks();
}

// Mouse wheel zoom
function mouseWheel(event) {
	if(event.delta < 0){
		scaleFactor = scaleFactor * 1.15;
	} else if(event.delta > 0){
		scaleFactor = scaleFactor * 0.75;
	}
}


function easeInSine(x){
	return 1 - cos((x * PI) / 2);
}

