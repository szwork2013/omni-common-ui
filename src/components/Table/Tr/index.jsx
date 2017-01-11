import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

export const Tr = (props) => <tr className={classnames(styles.Tr, props.className)}>
  {props.children}
</tr>;

Tr.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Tr;
