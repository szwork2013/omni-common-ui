import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { reducer as singleSignOn } from 'containers/SingleSignOn';
import { reducer as privileges } from 'containers/Privileges';
import { reducer as impersonate } from 'containers/Impersonate';
import { combineReducers } from 'redux-immutable';
import { reducer as apiCalls } from 'containers/ApiCalls';
import log from 'domain/log';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import invariant from 'invariant';
import is from 'is_js';

if (! PRODUCTION) {
  installDevTools(Immutable);
}

export function setupStore(reducer, history) {
  if (! PRODUCTION) {
    invariant((is.object(reducer) || is.array(reducer)) && is.not.empty(reducer), '`reducer` not provided');
    invariant(is.object(history) && is.not.empty(history), '`history` not provided');
  }

  const createStoreWithMiddleware = compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      getLoggerMiddleware()
    )
  )(createStore);

  return createStoreWithMiddleware(createReducer(reducer),
      window.devToolsExtension && window.devToolsExtension());
}

function createReducer(reducer) {
  return combineReducers({
    rootReducer: combineReducers(reducer),
    routing: routerReducer,
    singleSignOn,
    privileges,
    impersonate,
    apiCalls,
  });
}

function getLoggerMiddleware() {
  if (PRODUCTION) {
    return () => (next) => (action) => {
      try {
        log.debug('Dispatched action:', JSON.stringify(action, null, 2));
      } catch (e) {
        log.warn('Could not log action:', e);
      }

      return next(action);
    };
  }

  return createLogger();
}

export default setupStore;
