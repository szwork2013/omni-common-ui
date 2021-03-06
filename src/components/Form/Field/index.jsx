import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Field = (props) => {
  const classes = classnames(styles.Field, getValidationClasses());
  if (props.useLabel === true) {
    return <label className={classes}>{renderInner()}</label>;
  }

  return <div className={classes}>{renderInner()}</div>;

  function renderInner() {
    return <div className={styles.Field_wrap}>
      <span className={styles.Field_wrap_label}>{props.label}</span>
      <div className={styles.Field_wrap_inputContainer}>
        {props.children}
        {renderError()}
      </div>
    </div>;
  }

  function renderError() {
    if (! props.showError()) {
      return;
    }

    return <span className={styles.Field_wrap_inputContainer_validationError}>
      {getErrorMessage()}
    </span>;
  }

  function getValidationClasses() {
    if (props.showError()) {
      return styles.__error;
    }

    if (props.showRequired()) {
      return styles.__required;
    }
  }

  function getErrorMessage() {
    if (props.showRequired()) {
      return 'This field is required';
    }

    return props.getErrorMessage();
  }
};

Field.propTypes = {
  label: React.PropTypes.string,
  showError: React.PropTypes.func.isRequired,
  showRequired: React.PropTypes.func.isRequired,
  getErrorMessage: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  useLabel: React.PropTypes.bool,
};

export default Field;
