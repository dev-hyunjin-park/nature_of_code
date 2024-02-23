class Wave {
  constructor(amp, period, phase) {
    this.amplitude = amp;
    this.period = period;
    this.phase = phase;
  }

  evaluate(x) {
    return sin(this.phase + (TWO_PI * x) / this.period) * this.amplitude;
  }

  update() {
    this.phase += 0.001;
  }
}
