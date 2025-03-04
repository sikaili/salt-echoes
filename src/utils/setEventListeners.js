const setListeners = (sk, Tone) => {
  const divNode = document.querySelector('body');
  divNode.addEventListener(
    'click',
    async () => {
      try {
        if (Tone) {
          await Tone.start();
        }
        sk.start();
        sk.soundIsReady = true;
      } catch (err) {
        //
      }
    },
    { once: true, passive: false }
  );
  divNode.addEventListener(
    'touchstart',
    async () => {
      try {
        if (Tone) {
          await Tone.start();
        }
        sk.start();
        sk.soundIsReady = true;
      } catch (err) {
        //
      }
    },
    { once: true, passive: false }
  );
  divNode.addEventListener('touchstart', sk.handleTouchStart, {
    passive: false,
  });

  divNode.addEventListener('mousedown', sk.handleTouchStart, {
    passive: false,
  });

  divNode.addEventListener('touchend', sk.handleTouchEnd, {
    passive: false,
  });

  divNode.addEventListener('mouseup', sk.handleTouchEnd, {
    passive: false,
  });

  divNode.addEventListener(
    'ontouchmove',
    m => {
      m.preventDefault();
    },
    { passive: false }
  );

  divNode.addEventListener('touchmove', sk.handleTouchMove, { passive: false });
  divNode.addEventListener('mousemove', sk.handleTouchMove, { passive: false });
};
export default setListeners;
