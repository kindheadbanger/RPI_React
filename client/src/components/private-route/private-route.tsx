import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { AuthorizationStatusType } from '../../types/authorization-status';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatusType;
};

function PrivateRoute({ children, authorizationStatus }: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;