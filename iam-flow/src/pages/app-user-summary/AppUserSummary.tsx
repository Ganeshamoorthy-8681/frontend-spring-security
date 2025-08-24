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
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

export default function AppUserSummary() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock user data
  const userData = {
    id: userId || '1',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@techcorp.com',
    phone: '+1-555-0234',
    department: 'Engineering',
    position: 'Senior Developer',
    role: 'Developer',
    status: 'active',
    isVerified: true,
    mfaEnabled: true,
    lastLogin: '2024-08-24T09:15:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    permissions: [
      'user.read',
      'user.write',
      'project.read',
      'project.write',
      'code.deploy'
    ],
    recentActivity: [
      {
        action: 'Logged in from Chrome on Windows',
        timestamp: '2024-08-24T09:15:00Z',
        type: 'login'
      },
      {
        action: 'Updated profile information',
        timestamp: '2024-08-23T16:30:00Z',
        type: 'profile'
      },
      {
        action: 'Enabled two-factor authentication',
        timestamp: '2024-08-22T11:20:00Z',
        type: 'security'
      },
      {
        action: 'Password changed',
        timestamp: '2024-08-20T14:45:00Z',
        type: 'security'
      }
    ]
  };

  const handleEdit = () => {
    navigate(`/app/users/${userId}/edit`);
  };

  const handleBack = () => {
    navigate('/app/users');
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
      case 'login':
        return <PersonIcon fontSize="small" />;
      case 'security':
        return <SecurityIcon fontSize="small" />;
      case 'profile':
        return <EditIcon fontSize="small" />;
      default:
        return <AccessTimeIcon fontSize="small" />;
    }
  };

  if (loading) {
    return (
      <Box>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="200px" height={32} />
            <Skeleton variant="text" width="150px" height={20} />
          </Box>
          <Skeleton variant="rectangular" width={100} height={36} />
        </Stack>

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
    );
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ p: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {userData.firstName[0]}{userData.lastName[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1">
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.position} • {userData.department}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Edit User
        </Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Main Content */}
        <Stack spacing={3}>
          {/* Personal Information */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="primary" />
              Personal Information
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  First Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {userData.firstName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {userData.lastName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email Address
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body1">
                    {userData.email}
                  </Typography>
                  {userData.isVerified && (
                    <Tooltip title="Email verified">
                      <CheckCircleIcon color="success" fontSize="small" />
                    </Tooltip>
                  )}
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone Number
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body1">
                    {userData.phone}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Department
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BusinessIcon fontSize="small" color="action" />
                  <Typography variant="body1">
                    {userData.department}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Position
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {userData.position}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Account Details */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon color="primary" />
              Account & Security
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Role
                </Typography>
                <Chip label={userData.role} color="primary" size="small" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip 
                  label={userData.status} 
                  color="success" 
                  size="small"
                  icon={<CheckCircleIcon />}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Multi-Factor Authentication
                </Typography>
                <Chip 
                  label={userData.mfaEnabled ? 'Enabled' : 'Disabled'} 
                  color={userData.mfaEnabled ? 'success' : 'warning'}
                  size="small"
                  icon={userData.mfaEnabled ? <CheckCircleIcon /> : <WarningIcon />}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Login
                </Typography>
                <Typography variant="body1">
                  {formatDateTime(userData.lastLogin)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Account Created
                </Typography>
                <Typography variant="body1">
                  {formatDateTime(userData.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Permissions */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {userData.permissions.map((permission) => (
                <Chip
                  key={permission}
                  label={permission}
                  variant="outlined"
                  size="small"
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
                    {userData.permissions.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Permissions
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {userData.recentActivity.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recent Activities
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
              {userData.recentActivity.map((activity, index) => (
                <Box key={index} sx={{ 
                  p: 2, 
                  bgcolor: 'grey.50', 
                  borderRadius: 1,
                  borderLeft: 3,
                  borderLeftColor: activity.type === 'security' ? 'warning.main' : 'info.main'
                }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {getActivityIcon(activity.type)}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="inherit" />
                        {formatDateTime(activity.timestamp)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Quick Actions */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleEdit}
                startIcon={<EditIcon />}
              >
                Edit User
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/app/roles')}
                startIcon={<SecurityIcon />}
              >
                Manage Roles
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/app/users')}
                startIcon={<PersonIcon />}
              >
                All Users
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
