import styles from './style.postcss';

import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import is from 'is_js';

const Showcase = (props) => {
  return <div className={styles.Showcase}>
    <h1 className={styles.Showcase_title}>
      {renderTitle()}
    </h1>
    <div className={classnames(styles.Showcase_wrap, props.className)}>
      {props.children}
    </div>
  </div>;

  function renderTitle() {
    if (is.string(props.titleLink)) {
      return <Link to={props.titleLink}>{props.title}</Link>;
    }

    return props.title;
  }
};

Showcase.propTypes = {
  title: React.PropTypes.string.isRequired,
  titleLink: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Showcase;
