// Based on Daniel Shiffman's Nature of Code
// Genetic Algorithm, Evolbing Shakespeare
// https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp09_ga/NOC_9_01_GA_Shakespeare


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
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }
  this.calcFitness();

  // generate mating pool
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

    // each member will be added to the mating pool a number of times propotionate to its relative fitness
    for (var i = 0; i < this.population.length; i++) {
      //normalize fitness value
      var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      //mult by arbitrary num
      var n = floor(fitness * 100);
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i])
      }
    }
  }

  //create a new generation
  this.generate = function() {
    // Refill population with children from the mating pool.
    for (var i = 0; i < this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  this.getBest = function() {
    return this.best;
  }

  //Calculate the current "most fit" member of the population
  this.evaluate = function() {
    var worldRecord = 0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      var itemFitness = this.population[i].fitness;
      if ( itemFitness > worldRecord) {
        index = i;
        worldRecord = itemFitness;
      }
    }
    this.best = this.population[index].getPhrase();
    if (worldRecord === this.perfectScore) {
      this.finished = true;
    }
  }

  this.isFinished = function() {
    return this.finished;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  this.allPhrases = function() {
    var everything = "";
    var displayLimit = min(this.population.length, 50);
    for (var i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>"
    }
    return everything;
  }

}
