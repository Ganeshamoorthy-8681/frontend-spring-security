import styled from "@emotion/styled";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import List from "@mui/material/List";
import { useNavigate } from "react-router";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: #f4f4f4;
  padding: 16px;

  .active {
    background-color: #e0e0e0;
  }
`;


interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/app/dashboard'
  },
  {
    id: 'account',
    label: 'Account',
    icon: <AccountCircleIcon />,
    path: '/app/account'
  },
  {
    id: 'users',
    label: 'Users',
    icon: <PeopleIcon />,
    path: '/app/users'
  },
  {
    id: 'roles',
    label: 'Roles',
    icon: <SecurityIcon />,
    path: '/app/roles'
  }
];



const isPathActive = (itemPath: string) => {
  if (itemPath === '/app/dashboard') {
    return location.pathname === '/app/dashboard' || location.pathname === '/app';
  }
  return location.pathname.startsWith(itemPath);
};

export default function AppNavigationSidebar() {

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <List>
        {navigationItems.map((item) => {
          const isActive = isPathActive(item.path);
          return (
            <ListItem key={item.id} disablePadding className={ isActive ? 'active' : ''}>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </SidebarContainer>
  );
}
