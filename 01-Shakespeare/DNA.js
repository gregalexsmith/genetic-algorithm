// Based on Daniel Shiffman's Nature of Code
// Genetic Algorithm, Evolbing Shakespeare
// https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp09_ga/NOC_9_01_GA_Shakespeare


// need to describe pseudo-DNA
// For this example, a virtual organism's DNA is an array of characters
// Functionality:
//  - convert DNA into a string
//  - calculate DNA's 'fitness'
//  - mate DNA with another set of DNA
//  - mutate DNA

// name: newChar
// purpose: generate a new character within
// the proper range of ASCI values
function newChar() {
  var c = floor(random(63, 122))
  if (c == 63) c = 32;
  if (c == 64) c = 46;
  return String.fromCharCode(c);
}

//Constructor (make random DNA)
function DNA(num) {
  this.genes = [];
  this.fitness = 0;

  for (var i = 0; i < num; i++) {
    this.genes[i] = newChar();
  }

  // converts genes array to string
  this.getPhrase = function() {
    return this.genes.join("");
  }

  //Fitness function
  //returns: floating point percentage of correct characters
  this.calcFitness = function(target) {
    var score = 0;
    for (var i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++
      }
    }
    this.fitness = score / target.length;
  }

  //Crossover function
  this.crossover = function(partner) {
    //create new child
    var child = new DNA(this.genes.length);
    // pick a midpoint
    var midpoint = floor(random(this.genes.length));
    //combine the two
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i]
      }
    }
    return child;
  }

  //Based on a mutation probability, pick a new random character
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }

}
