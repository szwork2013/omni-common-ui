import {
  SingleSignOnHandler,
  IdleTimeoutHandler,
  routes as singleSignOnCallbacks,
} from 'containers/SingleSignOn';
import parseRoutes from 'domain/parseRoutes';
import App from 'components/App';
import is from 'is_js';
import PermissionHandler from 'containers/PermissionHandler';
import ErrorPageHandler from 'containers/ErrorPageHandler';
import LoadingOverlayHandler from 'containers/LoadingOverlayHandler';
import SaveBarHandler from 'containers/SaveBarHandler';
import NoMatchingRouteErrorHandler from 'containers/NoMatchingRouteErrorHandler';
import Store from 'domain/Store';

export default function setupRoutes(routes) {
  return parseRoutes([
    {
      path: '/health-check',
    },
    singleSignOnCallbacks,
    {
      component: SingleSignOnHandler,
      childRoutes: [{
        component: IdleTimeoutHandler,
        childRoutes: [{
          component: App,
          childRoutes: [
            {
              component: LoadingOverlayHandler,
              childRoutes: [{
                component: PermissionHandler,
                childRoutes: [{
                  component: ErrorPageHandler,
                  childRoutes: [{
                    component: SaveBarHandler,
                    childRoutes: is.array(routes) ? routes : [routes],
                  }],
                }],
              }],
            },
            {
              path: '*',
              component: NoMatchingRouteErrorHandler,
            },
          ],
        }],
      }],
    },
  ], Store.get());
}
