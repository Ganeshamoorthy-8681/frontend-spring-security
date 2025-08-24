import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

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

export default function AppBase() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    // TODO: Implement logout logic
    navigate('/login');
  };

  // Check if current path matches navigation item (including sub-routes)
  const isPathActive = (itemPath: string) => {
    if (itemPath === '/app/dashboard') {
      return location.pathname === '/app/dashboard' || location.pathname === '/app';
    }
    return location.pathname.startsWith(itemPath);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          IAM Flow
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navigationItems.map((item) => {
          const isActive = isPathActive(item.path);
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? 'primary.contrastText' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  // Get current page title based on location
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/app' || path === '/app/dashboard') {
      return 'Dashboard';
    } else if (path.startsWith('/app/account/settings')) {
      return 'Account Settings';
    } else if (path.startsWith('/app/account')) {
      return 'Account';
    } else if (path.match(/\/app\/users\/\d+\/edit/)) {
      return 'Edit User';
    } else if (path.match(/\/app\/users\/\d+/)) {
      return 'User Details';
    } else if (path.startsWith('/app/users')) {
      return 'Users';
    } else if (path.startsWith('/app/roles')) {
      return 'Roles';
    }
    
    return 'Dashboard';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getCurrentPageTitle()}
          </Typography>
          <IconButton
            size="large"
            aria-label="user account"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              JD
            </Avatar>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={userMenuAnchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
