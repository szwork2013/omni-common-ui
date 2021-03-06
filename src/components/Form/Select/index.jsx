import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React from 'react';
import ReactSelect from 'react-select';
import is from 'is_js';
import { HOC as formsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Icon from 'components/Icon';
import Field from '../Field';

const Select = (props) => {

  const arrowRenderer = () =>
    <span className={styles.Select_icon}>
      <Icon id="chevron-fat-down" />
    </span>;

  const classes = classnames(styles.Select_element,
      { [styles.__required]: props.showRequired() },
      { [styles.__error]: props.showError() });

  const select = <ReactSelect className={classes}
      onChange={(e) => handleChange(e)}
      arrowRenderer={() => arrowRenderer()}
      {...props} />;

  if (is.not.undefined(props.label)) {
    return <Field label={props.label}
        getErrorMessage={() => props.getErrorMessage()}
        showError={() => props.showError()}
        showRequired={() => props.showRequired()}
        useLabel>
      {select}
    </Field>;
  }
  return select;

  function handleChange(e) {
    props.setValue(e.value);
  }
};

Select.propTypes = {
  showRequired: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
  showError: React.PropTypes.func.isRequired,
  label: React.PropTypes.string,
};

export default formsyDecorator(Select);
