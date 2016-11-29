import {
  SingleSignOnHandler,
  routes as singleSignOnRoutes,
} from 'containers/SingleSignOn';
import App from 'components/App';
import is from 'is_js';
import { actions as Privileges } from 'containers/Privileges';
import PermissionHandler from 'containers/PermissionHandler';
import ErrorPageHandler from 'containers/ErrorPageHandler';
import LoadingOverlayHandler from 'containers/LoadingOverlayHandler';
import SavingBarHandler from 'containers/SavingBarHandler';

export default (routes) => ({ getState }) => [
  {
    path: '/health-check',
  },
  singleSignOnRoutes,
  {
    component: SingleSignOnHandler,
    childRoutes: [{
      component: PermissionHandler,
      childRoutes: [{
        component: App,
        // This will block calling any other checkPrivileges() until the privileges are loaded.
        checkPrivileges: () => Privileges.isLoading(getState()),
        childRoutes: [{
          path: '*',
          component: ErrorPageHandler,
          childRoutes: [{
            component: SavingBarHandler,
            childRoutes: [{
              component: LoadingOverlayHandler,
              childRoutes: is.array(routes) ? routes : [routes],
            }],
          }],
        }],
      }],
    }],
  },
];
