// Population
// create a new generation of rockets after each lifetime
// A mating pool is created based on fitness values found at the end of the current lifetime
// A new generation is created based on that mating pool

function Population(mutationRate, num, lifetime) {
 this.mutationRate = mutationRate;
 this.population = [];
 this.matingPool = [];
 this.generations = 0;
 this.startLocation = {
   x: width / 2,
   y: height - 20
 };

 //generate initial population
 for (var i = 0; i < num; i++) {
   var location = createVector(this.startLocation.x, this.startLocation.y)
   this.population[i] = new Rocket(location, new DNA());
 }

 // Run all rockets
 this.run = function() {
   for (var i = 0; i < this.population.length; i++) {
     this.population[i].run();
   }
 };

 // Calculate fitness for each population member
 this.calcFitness = function() {
   for (var i = 0; i < this.population.length; i++) {
     this.population[i].calcFitness();
   }
 };

 // Generate a mating pool
 this.generatePool = function() {
   this.matingPool = [];
   // get the best fitness in the population
   var maxFitness = this.getMaxFitness();
   // generate a new mating pool
   // add population members with high fitness values a greater number of times
   for (var i = 0; i < this.population.length; i++) {
     //normalize the member's fitness value
     var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
     // add to the mating pool a number of times proportionate to the fitness
     var n = floor(fitnessNormal * 100);
     for (var j = 0; j < n; j++) {
       this.matingPool.push(this.population[i]);
     }
   }
 };

 // Making the next generation
 this.generateNewPopulation = function() {
   // create a new generation
   // overwrite the current population with new results from the mating pool
   for (var i = 0; i < this.population.length; i++) {
     // choose two random sources from the mating pool
     var indexA = floor(random(this.matingPool.length));
     var indexB = floor(random(this.matingPool.length));
     // get the genetic information
     var sourceA = this.matingPool[indexA].getDNA();
     var sourceB = this.matingPool[indexB].getDNA();
     // generate new DNA by combining the two sources
     var newDNA = sourceA.crossover(sourceB);
     // Mutate the new DNA
     newDNA.mutate(this.mutationRate);
     // Fill the new population with a Rocket constructed with this new DNA
     var location = createVector(this.startLocation.x, this.startLocation.y)
     this.population[i] = new Rocket(location, newDNA);
   }
   this.generations++;
 };

 this.getGenerations = function() {
   return this.generations;
 };

 // Find the highest fitness in the population
 this.getMaxFitness = function() {
   var maxFit = 0;
   for (var i = 0; i < this.population.length; i++) {
     var itemFitness = this.population[i].getFitness();
     if(itemFitness > maxFit) {
       maxFit = itemFitness;
     }
   }
   return maxFit;
 };
}
