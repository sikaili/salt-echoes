import * as Tone from 'tone';

import setListeners from '../utils/setEventListeners';

export const piezoExperiment = sk => {
  let mic, meter;
  let audioReady = false;

  sk.setup = function () {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);

    // Create a button for starting the audio context
  };

  sk.handleTouchEnd = async () => {
    await Tone.start();
    console.log('Audio is ready');

    // Create an audio input
    mic = new Tone.UserMedia().toDestination();
    await mic.open();
    console.log('Mic is open');

    // Create a meter
    meter = new Tone.Meter();
    mic.connect(meter);
    audioReady = true;
  };

  sk.draw = function () {
    if (audioReady) {
      const volume = meter.getValue();
      const gain = Tone.dbToGain(volume);
      if (gain > 0.1) {
        console.log(gain);
      }
      const colorIntensity = Math.floor(gain * 255 * 5);
      sk.background(colorIntensity);
    } else {
      sk.background(100); // Default background color before audio starts
    }
  };
  setListeners(sk);
};
