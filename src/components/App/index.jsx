import styles from './style.postcss';

import React, { Component } from 'react';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';
import Footer from 'components/Footer';
import classnames from 'classnames';
import testClass from 'domain/testClass';
import Breadcrumbs from 'components/Breadcrumbs';
import HistoryLink from 'components/HistoryLink';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import PerformanceProfiler from 'components/PerformanceProfiler';
import Config from 'domain/Config';
import BreadcrumbsBuilder from 'domain/BreadcrumbsBuilder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarExpanded: false };
  }

  componentDidMount() {
    this._setPageTitle(this.props);
  }

  componentWillUpdate(props) {
    this._setPageTitle(props);
  }

  _collapseSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ sidebarExpanded: false });
  }

  _expandSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ sidebarExpanded: true });
  }

  _onHamburgerClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState(({ sidebarExpanded }) => ({ sidebarExpanded: ! sidebarExpanded }));
  }

  _setPageTitle(props) {
    this._breadcrumbs = BreadcrumbsBuilder.buildWithProps(props);
    if (! this._breadcrumbs || this._breadcrumbs.length <= 0) {
      document.title = Config.get('displayTitle');
    } else {
      document.title = this._breadcrumbs.reduce((result, item, index) =>
          `${result}${index !== 0 ? ' / ' : ''}${item.label}`, `${Config.get('displayTitle')} - `);
    }
  }

  render() {
    return <div className={classnames(styles.App, testClass('app'))}>
      {
        ! PRODUCTION &&
        <PerformanceProfiler />
      }
      <Header {...this.props} onHamburgerClick={(e) => this._onHamburgerClick(e)} />
      <div className={styles.App_wrap}>
        <Sidebar {...this.props} expanded={this.state.sidebarExpanded}
            onExpand={(e) => this._expandSidebar(e)}
            onCollapse={(e) => this._collapseSidebar(e)} />
        <div className={styles.App_content}>
          {
            ! this.props.isThereAnError &&
            <div className={styles.App_content_auxiliary}>
              {
                this._breadcrumbs &&
                <Breadcrumbs className={styles.App_content_auxiliary_breadcrumbs}
                    items={this._breadcrumbs}
                    singleLineMode />
              }
              <HistoryLink className={styles.App_content_auxiliary_historyLink} {...this.props} />
            </div>
          }
          <div className={styles.App_content_wrap}>{this.props.children}</div>
        </div>
      </div>
      <Footer />
    </div>;
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  isThereAnError: React.PropTypes.bool.isRequired,
};

export function mapStateToProps(state) {
  return { isThereAnError: ApiCall.getErrors(state).size > 0 };
}

export default connect(mapStateToProps)(App);
