class Emitter {
  constructor() {
    this.particles = [];
  }

  emit(num) {
    // for (let i = 0; i < num; i++) {
    this.particles.push(new Particle(mouseX, mouseY));
  }

  update() {
    for (let particle of this.particles) {
      let gravity = createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
    }

    this.particles = this.particles.filter((particle) => !particle.finished());
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
