import 'assets/styles/base/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Store from 'domain/Store';
import ErrorMessage from 'domain/ErrorMessage';
import ReactAI from 'react-appinsights';
import Config from 'domain/Config';
import ReactGA from 'react-ga';
import Raven from 'raven-js';
import bindPolyfills from 'domain/Polyfills';
import createHistory from 'history/createBrowserHistory';
import setupRoutes from './setupRoutes';

bindPolyfills();

export function setupApp({ routes, reducer, errorMessageMap }) {
  const history = createHistory();

  if (PRODUCTION) {
    ReactAI.init({ instrumentationKey: Config.get('appInsights') }, browserHistory);
  }

  Raven.config(Config.get('sentryDsn'), {
    release: COMMIT,
    environment: SENTRY_ENV,
    tags: { version: VERSION },
    debug: ! PRODUCTION,
  }).install();

  ErrorMessage.setMap(errorMessageMap);
  Store.set(setupStore(reducer, history));

  const gaKey = Config.get('gaKey');
  if (Config.get('gaKey')) {
    ReactGA.initialize(gaKey, { debug: ! PRODUCTION, titleCase: false });
  }

  render(
    <Provider store={Store.get()}>
      <ConnectedRouter history={history} routes={setupRoutes(routes)} onUpdate={logPageView} />
    </Provider>,
    document.getElementById('root')
  );
}

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export default setupApp;
