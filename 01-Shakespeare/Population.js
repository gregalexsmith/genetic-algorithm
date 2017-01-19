// Based on Daniel Shiffman's Nature of Code
// Genetic Algorithm, Evolving Shakespeare
// https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp09_ga/NOC_9_01_GA_Shakespeare

// Population.js
// describe the population of virual organisms
// in this case, each organism is an instance of the DNA object

function Population(targetPhrase, mutationRate, num) {
  this.population = [];
  this.matingPool = [];
  this.generations = 0;
  this.finished = false;
  this.target = targetPhrase;
  this.mutationRate = mutationRate;
  this.perfectScore = 1;

  this.best = "";

  // build population
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }

  // perform fitness calculation for each member of the population
  // this can only be done once the population has been created with a known target
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }
  this.calcFitness();

  // generate mating pool based on fitness results of the population
  // inefficient, but a good basic first step in understanding
  this.naturalSelection = function() {
    //clear the matingPool
    this.matingPool = [];

    // find max fitness in population
    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // each member will be added to the mating pool a number of times proportionate to its relative fitness
    for (var i = 0; i < this.population.length; i++) {
      //normalize fitness value
      var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      // n will represnet the number of times member is found in the pool
      // directly related to the fitness level (times a constant for scale)
      var n = floor(fitness * 100);
      // add the current member to the pool n number of times.
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i])
      }
    }
  }

  // create a new generation
  // we can now pick from the mating pool which is filled with members proportionate to their fitness values
  this.generate = function() {
    // re-writes the population array with new values pulled from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      // pick two random partners from the pool
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      // combine the two partners to give a new child
      var child = partnerA.crossover(partnerB);
      // perform mutation on the new child
      child.mutate(this.mutationRate);
      // add to the new population array
      this.population[i] = child;
    }
    this.generations++;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  //Calculate the current "most fit" member of the population
  this.evaluate = function() {
    var worldRecord = 0;
    var index = 0;
    // find the member with the highest fitness level
    for (var i = 0; i < this.population.length; i++) {
      var itemFitness = this.population[i].fitness;
      if ( itemFitness > worldRecord) {
        index = i;
        worldRecord = itemFitness;
      }
    }
    // set the current best member
    this.best = this.population[index].getPhrase();
    // check to see if the target has been met
    if (worldRecord === this.perfectScore) {
      this.finished = true;
    }
  }

  this.getBest = function() {
    return this.best;
  }

  this.isFinished = function() {
    return this.finished;
  }

  // calculate the average fitness of the entire population
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  // return all previous phrases
  // useful for displaying a list of previous generations to the user
  this.allPhrases = function() {
    var everything = "";
    var displayLimit = min(this.population.length, 50);
    for (var i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>"
    }
    return everything;
  }

}
