import { Routes, Route, Navigate } from 'react-router';
import App from "../App";
import AppAccountCreate from "../pages/app-account-create/AppAccountCreate";
import AppBase from "../pages/app-base/AppBase";
import AppDashboard from "../pages/app-dashboard/AppDashboard";
import AppAccount from "../pages/app-account/AppAccount";
import AppAccountSettings from "../pages/app-account-settings/AppAccountSettings";
import AppUsers from "../pages/app-users/AppUsers";
import AppUserSummary from "../pages/app-user-summary/AppUserSummary";
import AppUserEdit from "../pages/app-user-edit/AppUserEdit";
import AppRoles from "../pages/app-roles/AppRoles";
import AppUserCreate from '../pages/app-user-create/AppUserCreate';
import AppRoleSummary from '../pages/app-role-summary/AppRoleSummary';
import AppRoleCreate from '../pages/app-role-create/AppRoleCreate';
import AppRoleEdit from '../pages/app-role-edit/AppRoleEdit';
import AppLoginContainer from '../pages/app-login/AppLoginContainer';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<AppLoginContainer />} />
      <Route path="/account-create" element={<AppAccountCreate />} />
      <Route path="/app" element={<AppBase />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AppDashboard />} />
        <Route path="account" element={<AppAccount />} />
        <Route path="account/settings" element={<AppAccountSettings />} />
        <Route path="users" element={<AppUsers />} />
        <Route path='users/create' element={<AppUserCreate />} />
        <Route path="users/:userId" element={<AppUserSummary />} />
        <Route path="users/:userId/edit" element={<AppUserEdit />} />
        <Route path="roles" element={<AppRoles />} />
        <Route path="roles/create" element={<AppRoleCreate />} />
        <Route path="roles/:roleId" element={<AppRoleSummary />} />
        <Route path="roles/:roleId/edit" element={<AppRoleEdit />} />
      </Route>
    </Routes>
  );
}
