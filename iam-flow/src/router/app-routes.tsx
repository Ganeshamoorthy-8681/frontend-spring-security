import App from "../App";
import AppAccountCreate from "../pages/app-account-create/AppAccountCreate";
import AppBase from "../pages/app-base/AppBase";
import AppDashboard from "../pages/app-dashboard/AppDashboard";
import AppAccount from "../pages/app-account/AppAccount";
import AppUsers from "../pages/app-users/AppUsers";
import AppRoles from "../pages/app-roles/AppRoles";

export const appRoutes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/account-create',
    element: <AppAccountCreate />,
  },
  {
    path: '/app',
    element: <AppBase />,
    children: [
      {
        path: 'dashboard',
        element: <AppDashboard />,
      },
      {
        path: 'account',
        element: <AppAccount />,
      },
      {
        path: 'users',
        element: <AppUsers />,
      },
      {
        path: 'roles',
        element: <AppRoles />,
      },
    ],
  },
];
