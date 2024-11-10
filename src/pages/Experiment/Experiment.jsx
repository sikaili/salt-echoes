import { ReactP5Wrapper } from '@p5-wrapper/react';
import { piezoExperiment } from '@sketches/piezoExperiment';
import { whiteDots } from '../../sketches/whiteDots';
function Experiment() {
  return (
    <div>
      {/* <ReactP5Wrapper sketch={piezoExperiment} /> */}
      <ReactP5Wrapper sketch={whiteDots} />
    </div>
  );
}

export default Experiment;
