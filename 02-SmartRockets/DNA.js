//DNA will represent the data encoding of the rockets
//dna.genes will be an array of Vectors that represent the complete path of the rocket over its lifespan

function DNA(newgenes) {
  this.maxforce = 0.2;
  //create genes array
  if (Array.isArray(newgenes)) {
    this.genes = newgenes;
  } else {
    // generate a random set of genes
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      var angle = random(TWO_PI);
      this.genes[i] = p5.Vector.fromAngle(angle);
      this.genes[i].mult(random(0, this.maxforce));
    }
  }

  // combine this DNA instance with another to make new DNA
  this.crossover = function(partner) {
    // Pick a midpoint
    var crossover = floor(random(this.genes.length));
    // create a new genes array from the two DNA objects
    var newGenes = [];
    for (var i = 0; i < this.genes.length; i++) {
      if (i > crossover) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    // return a DNA object based on the new genes
    return new DNA(newGenes);
  };

  // Based on a mutation probability, picks a new random Vector
  // this helps to find alternative paths to the initial 'high fitness' options
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        var angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  };
}
