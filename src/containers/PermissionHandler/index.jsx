import React, { Component } from 'react';
import connect from 'domain/connect';
import is from 'is_js';

export class PermissionHandler extends Component {
  componentWillMount() {
    this._redirectIfNeeded(this.props);
  }

  componentWillReceiveProps(props) {
    this._redirectIfNeeded(props);
  }

  _redirectIfNeeded(props) {
    if (is.not.object(props.shouldRedirect)) {
      return;
    }

    props.shouldRedirect.find(({ checkPrivileges }) => checkPrivileges(props));
  }

  render() {
    if (! this.props.children) {
      return null;
    }

    return this.props.children;
  }
}

PermissionHandler.propTypes = {
  shouldRedirect: React.PropTypes.arrayOf(React.PropTypes.shape({
    checkPrivileges: React.PropTypes.func.isRequired,
  })),
  children: React.PropTypes.node,
};

export function mapStateToProps(state, { routes }) {
  const shouldRedirect = routes.filter((route) => {
    if (is.not.existy(route.checkPrivileges)) {
      return false;
    }

    if (! PRODUCTION) {
      if (is.not.function(route.checkPrivileges)) {
        throw new Error('checkPrivileges in the route configuration should be a function');
      }
    }

    return true;
  });

  return { shouldRedirect };
}

export default connect(mapStateToProps)(PermissionHandler);