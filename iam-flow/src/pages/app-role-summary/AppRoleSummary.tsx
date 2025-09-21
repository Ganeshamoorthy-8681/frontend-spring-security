import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { Menu, MenuItem, Toolbar } from '@mui/material';

export default function AppRoleSummary() {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock role data based on roleId
  const getRoleData = (id: string) => {
    const roles = {
      '1': {
        id: '1',
        name: 'Account Owner',
        description: 'Full access to all account features and settings',
        permissions: ['admin.full'],
        userCount: 1,
        isSystemRole: true,
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-15T09:00:00Z',
        createdBy: 'System',
        category: 'Administrative'
      },
      '2': {
        id: '2',
        name: 'Admin',
        description: 'Administrative access with user and role management',
        permissions: ['users.read', 'users.write', 'users.delete', 'roles.read', 'roles.write', 'account.read'],
        userCount: 2,
        isSystemRole: false,
        createdAt: '2024-01-20T10:30:00Z',
        updatedAt: '2024-02-15T14:20:00Z',
        createdBy: 'John Doe',
        category: 'Administrative'
      },
      '3': {
        id: '3',
        name: 'User Manager',
        description: 'Can manage users but not roles or account settings',
        permissions: ['users.read', 'users.write', 'account.read'],
        userCount: 1,
        isSystemRole: false,
        createdAt: '2024-02-01T11:00:00Z',
        updatedAt: '2024-02-01T11:00:00Z',
        createdBy: 'Sarah Chen',
        category: 'Management'
      }
    };
    return roles[id as keyof typeof roles] || roles['2'];
  };

  const roleData = getRoleData(roleId || '2');

  // Mock permissions detail
  const permissionDetails = [
    { id: 'users.read', name: 'Read Users', description: 'View user information', category: 'Users' },
    { id: 'users.write', name: 'Write Users', description: 'Create and edit users', category: 'Users' },
    { id: 'users.delete', name: 'Delete Users', description: 'Delete user accounts', category: 'Users' },
    { id: 'roles.read', name: 'Read Roles', description: 'View role information', category: 'Roles' },
    { id: 'roles.write', name: 'Write Roles', description: 'Create and edit roles', category: 'Roles' },
    { id: 'account.read', name: 'Read Account', description: 'View account information', category: 'Account' },
    { id: 'admin.full', name: 'Full Admin Access', description: 'Complete system administration', category: 'Admin' }
  ];

  const rolePermissions = permissionDetails.filter(p => roleData.permissions.includes(p.id));

  // Mock recent role activity
  const recentActivity = [
    {
      action: 'Role permissions updated',
      timestamp: '2024-08-24T09:15:00Z',
      type: 'permission',
      user: 'John Doe'
    },
    {
      action: 'User assigned to role',
      timestamp: '2024-08-23T16:30:00Z',
      type: 'assignment',
      user: 'Sarah Chen'
    },
    {
      action: 'Role description updated',
      timestamp: '2024-08-22T11:20:00Z',
      type: 'update',
      user: 'Admin User'
    },
    {
      action: 'Role created',
      timestamp: roleData.createdAt,
      type: 'creation',
      user: roleData.createdBy
    }
  ];

  const handleBack = () => {
    navigate('/app/roles');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'permission':
        return <SecurityIcon fontSize="small" />;
      case 'assignment':
        return <PersonIcon fontSize="small" />;
      case 'update':
        return <EditIcon fontSize="small" />;
      case 'creation':
        return <AdminPanelSettingsIcon fontSize="small" />;
      default:
        return <AccessTimeIcon fontSize="small" />;
    }
  };

  return (
    <>
      <Paper>
        <Toolbar className='toolbar'>
          <div className='toolbar-action'>
            <IconButton size='medium' onClick={handleBack} sx={{ p: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Role
            </Typography>
          </div>

          <div>
            <Button onClick={handleClick}>
              Actions
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => navigate('/app/roles/' + roleData.id + '/edit')}>
                <EditIcon fontSize="small" sx={{ mr: 2 }} /> EDIT
              </MenuItem>
              {!roleData.isSystemRole && (
                <>
                  <MenuItem onClick={() => navigate('/app/roles/')}>
                    <BlockIcon fontSize="small" sx={{ mr: 2 }} /> DISABLE
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/app/roles/')}>
                    <DeleteIcon fontSize="small" color='error' sx={{ mr: 2 }} /> DELETE
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
        </Toolbar>
      </Paper>

      <Box className='page-content'>
        {loading ? (
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
              <Stack spacing={3}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Skeleton variant="text" width="150px" height={28} sx={{ mb: 2 }} />
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {[...Array(6)].map((_, i) => (
                      <Box key={i}>
                        <Skeleton variant="text" width="80px" height={20} />
                        <Skeleton variant="text" width="120px" height={24} />
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Stack>

              <Stack spacing={3}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Skeleton variant="text" width="120px" height={28} sx={{ mb: 2 }} />
                  {[...Array(4)].map((_, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                      <Skeleton variant="text" width="100%" height={20} />
                      <Skeleton variant="text" width="60px" height={16} />
                    </Box>
                  ))}
                </Paper>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
            {/* Main Content */}
            <Stack spacing={3}>
              {/* Role Information */}
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon color="primary" />
                  Role Information
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Role Name
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {roleData.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {roleData.category}
                    </Typography>
                  </Box>
                  <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body1">
                      {roleData.description}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Users Assigned
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {roleData.userCount} users
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Role Type
                    </Typography>
                    <Chip
                      label={roleData.isSystemRole ? 'System Role' : 'Custom Role'}
                      size="small"
                      color={roleData.isSystemRole ? 'warning' : 'primary'}
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Created By
                    </Typography>
                    <Typography variant="body1">
                      {roleData.createdBy}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body1">
                      {formatDateTime(roleData.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Permissions */}
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Permissions ({roleData.permissions.length})
                </Typography>
                
                {/* Professional Chip Design */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {roleData.permissions.map((permission, index) => (
                    <Chip
                      key={index}
                      label={permission}
                      variant="outlined"
                      size="small"
                      color="primary"
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: '0.75rem'
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Stack>

            {/* Sidebar */}
            <Stack spacing={3}>
              {/* Quick Stats */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Quick Stats
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        {rolePermissions.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Permissions
                      </Typography>
                    </Box>
                    <Box sx={{ height: 1, bgcolor: 'divider' }} />
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        {roleData.userCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Users Assigned
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Recent Activity
                </Typography>
                <Stack spacing={2}>
                  {recentActivity.map((activity, index) => (
                    <Box key={index} sx={{
                      p: 2,
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : '#ffffff',
                      borderRadius: 1,
                      borderLeft: 3,
                      borderLeftColor: activity.type === 'permission' ? 'warning.main' : 
                                     activity.type === 'assignment' ? 'success.main' : 'info.main'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getActivityIcon(activity.type)}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {activity.action}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon fontSize="inherit" />
                            {formatDateTime(activity.timestamp)} by {activity.user}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
