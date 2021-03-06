import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';
import Checkbox from './Checkbox';

class CheckboxList extends Component {
  static cmp(a, b) {
    return a === b;
  }

  componentDidMount() {
    this.props.setValue([]);
  }

  handleChange(e, option) {
    const checked = e.currentTarget.checked;

    let newValue = [];
    if (checked) {
      newValue = this.props.getValue().concat(option);
    } else {
      newValue = this.props.getValue().filter((it) => ! CheckboxList.cmp(it, option));
    }

    this.props.setValue(newValue);
  }

  render() {
    const { name, label, items, validations, validationError } = this.props;
    const checked = this.props.getValue() || [];

    return <Field label={label}
        getErrorMessage={() => this.props.getErrorMessage()}
        showError={() => this.props.showError()}
        validations={validations}
        validationError={validationError}
        showRequired={() => this.props.showRequired()}>
      {
        items.map((item, i) =>
          <Checkbox key={i}
              name={name}
              item={item}
              onChecked={(e) => this.handleChange(e, item)}
              checked={checked.indexOf(item) >= 0} />)
      }
    </Field>;
  }

}

CheckboxList.propTypes = {
  setValue: React.PropTypes.func.isRequired,
  getValue: React.PropTypes.func.isRequired,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  items: React.PropTypes.array,
  getErrorMessage: React.PropTypes.func.isRequired,
  showRequired: React.PropTypes.func.isRequired,
  showError: React.PropTypes.func.isRequired,
  validations: React.PropTypes.string,
  validationError: React.PropTypes.string,
};

export default formsyDecorator(CheckboxList);
