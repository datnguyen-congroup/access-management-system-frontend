import { userPermissions } from './permissions';
import { routes } from './routes';

export const userModule = {
  routes,
  permissions: userPermissions,
};
