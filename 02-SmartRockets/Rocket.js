// The Rocket is the 'phenotype' in the example
// It is the actual implementation of the DNA on the canvas
//  - Handles the physical response of the rocket based on the array of Vectors in dna.genes
//  - Has instructions for rendering the rocket to the canvas
//  - able to check its place in the world
//    - can calculate its fitness: how close it is to the target
//    - can see if it hit any obstacles and stop

function Rocket(location, dna) {
  this.acceleration = createVector();
  this.velocity = createVector();
  this.position = location.copy();
  this.size = 4;
  this.fitness = 0;
  this.dna = dna;
  this.geneCounter = 0;
  this.hitTarget = false;

  //Calculate Fitness of rocket instance
  //fitness in this case is given by how close the rocket gets to the target
  this.calcFitness = function() {
    //get distance from rocket to target
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    //fitness = one divided by distance squared
    //this gives an exponential increase in fitness when the rocket gets closer to the target
    this.fitness = pow(1/d, 2);
  };

  // do checks and call update and render functions if ok
  this.run = function() {
    this.checkTarget();
    if (!this.hitTarget) {
      //continue to apply next force
      this.applyForce(this.dna.genes[this.geneCounter]);
      //add to geneCounter and rollover if it reaches the end of the genes array
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
    }
    //always render the rocket
    this.render();
  };

  // Did I make it to the target

  this.checkTarget = function() {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 12) {
      this.hitTarget = true;
    }
  };

  this.applyForce = function(f) {
    this.acceleration.add(f);
  };

  //update the forces applied to the rocket
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.render = function() {
    var theta = this.velocity.heading() + PI/2;
    var r = this.size;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Rocket body
    stroke(0);
    fill(255);
    beginShape(TRIANGLES);
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);

    pop();
  };

  this.getFitness = function() {
    return this.fitness;
  };

  this.getDNA = function() {
    return this.dna;
  };
}
