import styles from './style.postcss';

import React from 'react';
import ReactPerf from 'react-addons-perf';
import Button from 'components/Button';

class PerformanceProfiler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { started: false };
  }

  toggle() {
    const { started } = this.state;
    started ? ReactPerf.stop() : ReactPerf.start();
    this.setState({ started: ! started });
  }

  printWasted() {
    const lastMeasurements = ReactPerf.getLastMeasurements();
    ReactPerf.printWasted(lastMeasurements);
  }

  printOperations() {
    const lastMeasurements = ReactPerf.getLastMeasurements();
    ReactPerf.printOperations(lastMeasurements);
  }

  render() {
    const { started } = this.state;
    return <div className={styles.PerformanceProfiler}>
      <Button className={styles.PerformanceProfiler_button}
          onClick={() => this.toggle()}
          type={Button.Type.neoPrimary}>
        {started ? 'Stop' : 'Start'}
      </Button>
      <Button className={styles.PerformanceProfiler_button}
          onClick={() => this.printWasted()}
          type={Button.Type.neo}>
        Print Wasted
      </Button>
      <Button className={styles.PerformanceProfiler_button}
          onClick={() => this.printOperations()}
          type={Button.Type.neo}>
        Print Operations
      </Button>
    </div>;
  }
}

export default PerformanceProfiler;
