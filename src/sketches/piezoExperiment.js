import * as Tone from 'tone';

import setListeners from '../utils/setEventListeners';

export const piezoExperiment = sk => {
  let mic, meter;
  let audioReady = false;

  let images = [];
  let numImages = 45; // Number of images to load
  let unusedImages = [...images]; // Clone the array to track unused images

  sk.preload = () => {
    for (let i = 1; i <= numImages; i++) {
      const img = sk.loadImage(
        `/imgs/bubbles/_${i}.png`,
        () => console.log(`Image ${i} loaded successfully`),
        () => console.error(`Image ${i} failed to load`)
      );
      images.push(img);
    }
  };

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

  function Cloud(x, y, size, randomImage) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.randomImage = randomImage;
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
      // Select a random image
      // Set random opacity
      sk.tint(sk.noise(sk.frameCount / 1000 + this.offset) * 500);

      // Randomly adjust position and size based on noise
      const xOffset =
        sk.noise(sk.frameCount / 250 + this.offset) * size - size / 2;
      const yOffset =
        sk.noise(sk.frameCount / 500 + this.offset) * size - size / 2;
      sk.translate(this.x + xOffset, this.y + yOffset);
      sk.rotate((xOffset + yOffset) / 100 + this.offset);
      const imageSize =
        size * (2 + sk.noise(sk.frameCount / this.frequency + this.offset));

      // Display the random image at calculated position and size
      sk.image(this.randomImage, 0, 0, imageSize, imageSize * (sk.gain * 10));

      sk.pop();
    };
  }

  const createCloud = size => {
    if (unusedImages.length === 0) {
      // Reset unused images if all have been used
      unusedImages = [...images];
    }

    // Select a random image from the unusedImages array
    const randomIndex = Math.floor(Math.random() * unusedImages.length);
    const randomImage = unusedImages.splice(randomIndex, 1)[0]; // Remove and return the image

    sk.clouds.push(new Cloud(sk.mouseX, sk.mouseY, size * 2, randomImage));
    if (sk.clouds.length > 30) {
      sk.clouds = sk.clouds.slice(-30); // Retains the last 50 elements
    }
  };

  sk.draw = function () {
    if (audioReady) {
      // Get the current volume level from the meter
      const volume = meter.getValue();

      // Convert decibels to gain (amplitude)
      const gain = Tone.dbToGain(volume);
      sk.gain = gain;
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
