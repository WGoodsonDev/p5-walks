let xScl = 20;
let yScl = 20;

let numWalks = 20;

let walks = [];

let numStepsPerWalk = 0;

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
	background(20, 20, 20);
	colorMode(HSB, 100);
	// blendMode(SCREEN);
	newWalks();
	console.log(walks);
}

function draw() {
	if(frameCount % 4 === 0){numStepsPerWalk++};

	stroke(0, 0, 10);
	strokeWeight(1);

	// Draw circle at origin
	circle(width / 2, height / 2, 10);
	// Draw grid lines
	for(let i = 0; i <= width; i += xScl){
		line(i, 0, i, height);
	}

	for(let i = 0; i <= height; i += yScl){
		line(0, i, width, i);
	}


	walks.forEach((walk, idx) => {
		let hue = map(idx, 0, walks.length, 25, 50);
		stroke(hue, 100, 100, 10);
		strokeWeight(2);

		walk.display(numStepsPerWalk);
	})

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

class Walk{
	constructor(length) {
		this.length = length;
		this.steps = generateWalk(length);
	}

	display(steps){
		push();
		translate(width/2, height/2);

		for(let i = 0; i < min(steps, this.length); i++){
			const step = this.steps[i];
			let dx = dXdY[step]['dx'];
			let dy = dXdY[step]['dy'];
			line(0, 0, dx * xScl, dy * yScl);
			translate(dx * xScl, dy * yScl);
		}

		pop();
	}

}

function newWalks(){
	walks = [];
	numStepsPerWalk = 0;
	for(let i = 0; i < numWalks; i++){
		const newWalk = new Walk(round(random(24, 64)));
		walks.push(newWalk)
	}
}

function mouseClicked(){
	newWalks();
}