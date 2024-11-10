import * as Tone from 'tone';

import setListeners from '../utils/setEventListeners';

export const piezoExperiment = sk => {
  let mic, meter;
  let audioReady = false;

  sk.setup = function () {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.noStroke();
    // Create a button for starting the audio context
  };

  sk.handleTouchEnd = async () => {
    await Tone.start();
    console.log('Audio is ready');

    // Create an audio input (microphone) without routing to the destination
    mic = new Tone.UserMedia();
    await mic.open();
    console.log('Mic is open');

    // Create a meter
    meter = new Tone.Meter();

    // Connect the microphone to the meter but NOT to the output
    mic.connect(meter);

    audioReady = true;
  };

  sk.clouds = [];

  function Cloud(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.frequency = Math.random() + 0.5;
    this.offset = sk.noise(sk.frameCount / 300) * Math.random() * 100;
    this.randomVector = {
      x: (sk.noise(sk.frameCount / 30) - 0.5) * ((size ^ 2) / 20),
      y: (sk.noise(sk.frameCount * 100) - 0.5) * ((size ^ 2) / 20),
    };

    this.update = () => {
      this.x += this.randomVector.x;
      this.y += this.randomVector.y;
    };
    this.display = () => {
      sk.push();
      sk.noStroke();
      sk.fill(
        sk.noise(sk.frameCount / 250 + this.offset) * size + size,
        sk.noise(sk.frameCount / 1000 + this.offset) * size,
        sk.noise(sk.frameCount / this.frequency + this.offset) * size,
        sk.noise(sk.frameCount / this.frequency) * this.frequency * 255
      );
      sk.ellipse(
        this.x,
        this.y + (Math.sin(sk.frameCount / this.frequency) * size) / 20,
        sk.noise(
          sk.frameCount / ((25 * this.frequency * size) / 100) + this.offset
        ) * size
      );
      sk.ellipse(
        this.x,
        this.y,
        sk.noise(
          sk.frameCount / ((100 * this.frequency * size) / 100) + this.offset
        ) * size
      );
      sk.ellipse(
        this.x + (Math.sin(sk.frameCount / this.frequency) * size) / 20,
        this.y,
        sk.noise(
          sk.frameCount / ((5 * this.frequency * size) / 100) + this.offset
        ) * size
      );
      sk.ellipse(
        this.x +
          sk.noise(
            sk.frameCount / ((50 * this.frequency * size) / 100) + this.offset
          ) *
            5,
        this.y,
        sk.noise(
          sk.frameCount / ((50 * this.frequency * size) / 100) + this.offset
        ) * size
      );
      sk.textAlign('CENTER');
      sk.textSize(size / 3);
      sk.fill(0);
      const characters = ['ا', 'ح', 'د', 'ش', 'ط', 'م', 'و', 'ه'];
      const randomCharacter =
        characters[
          Math.floor(
            sk.noise(sk.frameCount / (this.offset * 30)) * characters.length
          )
        ];

      sk.text(randomCharacter, this.x, this.y);

      sk.pop();
    };
  }

  const createCloud = size => {
    sk.clouds.push(new Cloud(sk.mouseX, sk.mouseY, size * 2));
  };

  sk.draw = function () {
    if (audioReady) {
      // Get the current volume level from the meter
      const volume = meter.getValue();

      // Convert decibels to gain (amplitude)
      const gain = Tone.dbToGain(volume);

      // Only display the gain if it exceeds a certain threshold
      if (gain > 0.1) {
        console.log(gain);
        createCloud(gain * 255);
      }

      // Adjust the color intensity and visuals based on the gain
      const colorIntensity = Math.floor(gain * 255 * 5);
      sk.background(colorIntensity, 255);
      sk.ellipse(sk.mouseX, sk.mouseY, colorIntensity);
    } else {
      // Default background color before the audio starts
      sk.background(100, 50);
    }
    sk.push();
    sk.noStroke();
    sk.fill(255, sk.noise(sk.frameCount / 250) * 75);
    sk.ellipse(sk.mouseX, sk.mouseY, sk.noise(sk.frameCount / 25) * 100);
    sk.ellipse(sk.mouseX, sk.mouseY, sk.noise(sk.frameCount / 100) * 100);
    sk.ellipse(sk.mouseX, sk.mouseY, sk.noise(sk.frameCount / 5) * 100);
    sk.ellipse(
      sk.mouseX + sk.noise(sk.frameCount / 50) * 5,
      sk.mouseY,
      sk.noise(sk.frameCount / 50) * 100
    );

    sk.pop();
    sk.clouds?.map(cloud => {
      cloud.update();
      cloud.display();
    });
  };

  setListeners(sk);
};
