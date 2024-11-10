import * as Tone from 'tone';
import setListeners from '../utils/setEventListeners';

export const whiteDots = sk => {
  let mic, meter;
  let audioReady = false;
  let moveX = sk.windowWidth / 2; // Initialize moveX
  let moveY = 0; // Initialize moveY

  sk.setup = function () {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.noStroke();

    // // Create a button for starting the audio context
    // const startButton = sk.createButton('Start Audio');
    // startButton.position(10, 10);
    // startButton.mousePressed(async () => {
    //   await sk.handleTouchEnd();
    // });
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
  sk.draw = function () {
    sk.background(0, 255);

    sk.rect(
      moveX % sk.width,
      moveY % sk.height,
      100 + sk.gain * 300,
      100 + sk.gain * 300
    ); // Use modulo to wrap around the screen

    if (audioReady) {
      // Get the current volume level from the meter
      const volume = meter.getValue();
      // Convert decibels to gain (amplitude)
      const gain = Tone.dbToGain(volume);
      sk.gain = gain;
      // Only display the gain if it exceeds a certain threshold
      if (gain > 0.07) {
        console.log(gain);
        if (Math.random() > 0.2) {
          moveY = (0.7 + (Math.random() - 0.5) / 3) * sk.windowHeight;
          moveX = (0.5 + (Math.random() - 0.5) / 3) * sk.windowWidth;
        }
      }
      moveX += 2000 * gain * (Math.random() - 0.3);
      moveY += 500 * gain;
    }
  };

  setListeners(sk);
};
