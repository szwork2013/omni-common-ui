import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

export const Td = (props) => {
  return <td className={classnames(styles.Td, props.className)}
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      style={props.style}>
    <div className={styles.Td_wrap}>
      {renderContent()}
    </div>
  </td>;

  function renderContent() {
    if (props.overflowHidden !== true) {
      return props.children;
    }

    return <div className={styles.Td_content}>
      {props.children}
    </div>;
  }
};

Td.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
  colSpan: React.PropTypes.string,
  rowSpan: React.PropTypes.string,
  overflowHidden: React.PropTypes.bool,
};

export default Td;
