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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/account-create" element={<AppAccountCreate />} />
      <Route path="/app" element={<AppBase />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AppDashboard />} />
        <Route path="account" element={<AppAccount />} />
        <Route path="account/settings" element={<AppAccountSettings />} />
        <Route path="users" element={<AppUsers />} />
        <Route path="users/:userId" element={<AppUserSummary />} />
        <Route path="users/:userId/edit" element={<AppUserEdit />} />
        <Route path="roles" element={<AppRoles />} />
      </Route>
    </Routes>
  );
}
