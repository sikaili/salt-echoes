import { ReactP5Wrapper } from '@p5-wrapper/react';
import { piezoExperiment } from '@sketches/piezoExperiment';

function Experiment() {
  return (
    <div>
      <ReactP5Wrapper sketch={piezoExperiment} />
    </div>
  );
}

export default Experiment;
