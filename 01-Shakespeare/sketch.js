// Based on Daniel Shiffman's Nature of Code
// Genetic Algorithm, Evolving Shakespeare
// https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp09_ga/NOC_9_01_GA_Shakespeare


var target,
    popmax,
    mutationRate,
    population,
    bestPhrase,
    allPhrases,
    stats;

function setup() {
  // build a population with the following requirements
  target = "To be or not to be.";
  popmax = 300;
  mutationRate = 0.01;
  population = new Population(target, mutationRate, popmax);

  // Create DOM nodes
  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");
  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");
  stats = createP("Stats");
  stats.class("stats");
}

function draw() {
  //generate mating pool
  population.naturalSelection();
  //create next generation
  population.generate();
  //Calculate Fitness
  population.calcFitness();
  //Evaluate the best fitness in the population
  population.evaluate();
  // if target phrase is found, stop
  if (population.isFinished()) {
    noLoop();
  }
  //update the DOM
  displayInfo();
}

function displayInfo() {
  // Display current status of population
  var answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  var statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext +=    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext +=    "total population:      " + popmax + "<br>";
  statstext +=    "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}
