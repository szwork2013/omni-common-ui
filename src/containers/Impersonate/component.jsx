import styles from './style.postcss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { postImpersonate, clearImpersonateData } from './actions';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import testClass from 'domain/testClass';

const suffix = '@ef.com';

class Impersonate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      impersonateEmail: '',
      emailChanged: false,
    };

    this._handleSwitchClick.bind(this);
    this._handleEmailChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearImpersonateData();
  }

  _handleSwitchClick() {
    this.props.postedImpersonate(this.state.impersonateEmail + suffix);
    this.setState({ emailChanged: false });
  }

  _handleEmailChange(e) {
    this.setState({ impersonateEmail: e.target.value, emailChanged: true });
  }

  render() {
    const { postImpersonateState } = this.props;
    const errorCode = postImpersonateState ? postImpersonateState.get('error') : undefined;
    const data = postImpersonateState ? postImpersonateState.get('data') : undefined;

    if (data) {
      this.props.success(data);
    }

    const inputClasses = classnames({ [styles.error]: ! this.state.emailChanged && errorCode },
        testClass('impersonate-dialog-input'));

    return <div className={styles.Impersonate}>
      <p className={styles.Impersonate_title}>Switch User</p>
      <div>
        <TextInput labelName="Email"
            className={styles.Impersonate_field}
            inputClassName={inputClasses}
            suffix={suffix}
            onChange={(e) => this._handleEmailChange(e)} />
      </div>
      <Button.Container className={styles.Impersonate_buttonContainer}
          align="center">
        <Button type={Button.Type.primary}
            className={classnames(styles.button, testClass('impersonate-dialog-switch'))}
            disabled={! this.state.impersonateEmail}
            onClick={() => this._handleSwitchClick()}>
          SWITCH
        </Button>
        <Button className={styles.button}
            onClick={() => this.props.close()}>
          CANCEL
        </Button>
      </Button.Container>
    </div>;
  }
}

Impersonate.propTypes = {
  postImpersonateState: React.PropTypes.object,
  close: React.PropTypes.func,
  success: React.PropTypes.func,
  postedImpersonate: React.PropTypes.func,
  clearImpersonateData: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    postImpersonateState: state.get('impersonate')
      .get('postedImpersonate')
      .get('impersonate'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postedImpersonate: (email) => dispatch(postImpersonate(email)),
    clearImpersonateData: () => dispatch(clearImpersonateData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Impersonate);
