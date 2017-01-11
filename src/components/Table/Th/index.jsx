import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

export const Th = (props) => {
  return <th className={classnames(styles.Th, props.className)}
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      style={props.style}>
    <div className={styles.Th_wrap}>
      {renderContent()}
    </div>
  </th>;

  function renderContent() {
    if (props.overflowHidden !== true) {
      return props.children;
    }

    return <div className={styles.Th_content}>
      {props.children}
    </div>;
  }
};

Th.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
  colSpan: React.PropTypes.string,
  rowSpan: React.PropTypes.string,
  overflowHidden: React.PropTypes.bool,
};

export default Th;
