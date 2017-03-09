import React, { Component } from 'react';
import is from 'is_js';
import PageCard from '../PageCard';
import Level from './Level';
import Leaf from './Leaf';

import styles from './style.postcss';

class SelectionTable extends Component {

  constructor(props) {
    super(props);
    this.state = { route: [] };
    this._setUpData(props);
  }

  componentWillUpdate(props) {
    this._setUpData(props);
  }

  _setUpData(props) {
    const children = React.Children.toArray(props.children);
    this._level = children.filter((child) => child.type === Level);
  }

  _onLevelClick(route) {
    this.setState({ route });
  }


  _renderContent() {
    let levels = this._level.slice(0);
    const tempRoutes = Array.from([...this.state.route]);
    while (tempRoutes.length !== 0) {
      const currentRoute = tempRoutes.shift();
      levels = levels.find(
        (level) => level.props.label === currentRoute
      );
      levels = is.array(levels.props.children) ?
        levels.props.children.slice(0) :
        levels.props.children;
    }

    if (tempRoutes.length === 0) {
      return this._renderLevels(levels);
    }
  }

  _renderLevels(levels) {
    if (! is.array(levels) && levels.type === Leaf) {
      return <Leaf>{levels.props.children}</Leaf>;
    }
    return <div>
      {
        levels.map((level) =>
          <Level key={level.props.label}
              route={this.state.route}
              label={level.props.label}
              onClick={(route) => this._onLevelClick(route)}>
            {level.props.children}
          </Level>
        )
      }
    </div>;
  }

  _renderHeading() {
    const routes = this.state.route.slice(0);
    const onHeadingRouteClick = (route) => {
      const routeIndex = routes.indexOf(route);
      if (routeIndex >= 0) {
        const newRoute = routes.slice(0, routeIndex + 1);
        this.setState({ route: newRoute });
      }
    };
    const headingRouteClassName = styles.SelectionTable_heading_route;
    if (is.array(routes) && routes.length > 0) {
      return <PageCard.Heading>
        {
          routes.map((route) =>
            <span key={route}
                className={headingRouteClassName}
                onClick={() => onHeadingRouteClick(route)}>
              {route}
            </span>)
        }
      </PageCard.Heading>;
    }
    return <PageCard.Heading text={this.props.title} />;
  }

  render() {
    return <PageCard>
      {this._renderHeading()}
      <div>
        {this._renderContent()}
      </div>
    </PageCard>;
  }

}

SelectionTable.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
};

export default SelectionTable;