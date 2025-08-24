import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';

// Mock data - replace with actual API calls
const mockAccountData = {
  accountName: 'TechCorp Solutions',
  accountDescription: 'A leading technology solutions provider specializing in cloud infrastructure and enterprise software development.',
  accountType: 'ORGANIZATION',
  plan: 'Enterprise',
  status: 'Active',
  createdAt: '2024-01-15',
  rootUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@techcorp.com',
    emailVerified: true,
    lastLogin: '2024-08-23T10:30:00Z',
    role: 'Account Owner'
  }
};

export default function AppAccount() {
  const navigate = useNavigate();
  const [accountData] = useState(mockAccountData);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate stats loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const mockStats = {
    totalUsers: 127,
    activeUsers: 95,
    totalRoles: 8,
    pendingInvitations: 12
  };

  if (loading) {
    return (
      <Box>
        <Skeleton variant="text" width="200px" height={40} sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 2 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Skeleton variant="text" width="250px" height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {[...Array(6)].map((_, i) => (
                  <Box key={i}>
                    <Skeleton variant="text" width="80px" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="120px" height={24} />
                  </Box>
                ))}
              </Box>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3 }}>
              <Skeleton variant="text" width="200px" height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {[...Array(6)].map((_, i) => (
                  <Box key={i}>
                    <Skeleton variant="text" width="80px" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="120px" height={24} />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 1, minWidth: '280px' }}>
            <Stack spacing={2}>
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Account Details
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => navigate('/app/account/settings')}
          >
            Settings
          </Button>
          <Chip
            icon={<SecurityIcon />}
            label={accountData.plan}
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Stack>

      {/* Success Alert */}
      <Alert severity="success" sx={{ mb: 3 }}>
        Account is active and functioning normally. All systems operational.
      </Alert>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Account Information */}
        <Box sx={{ flex: 2 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon color="primary" />
                  Account Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Account Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {accountData.accountName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Account Type
                  </Typography>
                  <Chip 
                    label={accountData.accountType} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body2">
                    {accountData.accountDescription}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Plan
                  </Typography>
                  <Chip 
                    label={accountData.plan} 
                    color="success" 
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip 
                    label={accountData.status} 
                    color="success" 
                    variant="outlined"
                    size="small"
                    icon={<CheckCircleIcon />}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created Date
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(accountData.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>

          {/* Root User Details */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="primary" />
                  Root User Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    First Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {accountData.rootUser.firstName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {accountData.rootUser.lastName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email Address
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {accountData.rootUser.email}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email Verification Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={accountData.rootUser.emailVerified ? "Email is verified" : "Email needs verification"}>
                      <CheckCircleIcon 
                        fontSize="small" 
                        color={accountData.rootUser.emailVerified ? "success" : "error"} 
                      />
                    </Tooltip>
                    <Chip 
                      label={accountData.rootUser.emailVerified ? "Verified" : "Unverified"}
                      color={accountData.rootUser.emailVerified ? "success" : "error"}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Role
                  </Typography>
                  <Chip 
                    label={accountData.rootUser.role} 
                    color="primary" 
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Login
                  </Typography>
                  <Typography variant="body2">
                    {formatDateTime(accountData.rootUser.lastLogin)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* Account Stats Sidebar */}
        <Box sx={{ flex: 1, minWidth: '280px' }}>
          <Stack spacing={2}>
            <Card sx={{ position: 'relative', overflow: 'visible' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                {statsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="100px" height={20} sx={{ mx: 'auto' }} />
                  </>
                ) : (
                  <>
                    <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" color="primary" component="div">
                      {mockStats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Users
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {statsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="100px" height={20} sx={{ mx: 'auto' }} />
                  </>
                ) : (
                  <>
                    <TrendingUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" color="success.main" component="div">
                      {mockStats.activeUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Users
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {statsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="100px" height={20} sx={{ mx: 'auto' }} />
                  </>
                ) : (
                  <>
                    <SecurityIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" color="info.main" component="div">
                      {mockStats.totalRoles}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Roles
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {statsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="100px" height={20} sx={{ mx: 'auto' }} />
                  </>
                ) : (
                  <>
                    <MailOutlineIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4" color="warning.main" component="div">
                      {mockStats.pendingInvitations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Invitations
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
