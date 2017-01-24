//Genetic Algorithms - Smart Rockets
//This code follows Daniel Shiffman's tutorial/example found here:
//https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp09_ga/NOC_9_02_SmartRockets_superbasic

var population;
var lifespan = 200;
var mutationRate = 0.01;
var popSize = 50
var lifeCounter = 0;
var target;
var info;

function setup() {
  createCanvas(640, 360);
  lifespan = height;
  population = new Population(mutationRate, popSize);
  target = createVector(width/2, 50);
  info = createP("");
  info.position(10, 380);
}

function draw() {
  //fill background color
  background(200);

  //draw target
  fill(0);
  stroke(0);
  ellipse(target.x, target.y, 16, 16);

  // run the population untill the lifespan is reached
  if (lifeCounter < lifespan) {
    population.run();
    lifeCounter++;
  } else {
    //perform calculations on the completed population and generate another
    population.calcFitness();
    population.generatePool();
    population.generateNewPopulation();
    lifeCounter = 0;
  }

  info.html("Generation #: " + population.getGenerations() + "<br>" +
            "Cycles left: " + (lifespan-lifeCounter));
}
