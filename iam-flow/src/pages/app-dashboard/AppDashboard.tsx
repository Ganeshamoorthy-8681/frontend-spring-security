import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function AppDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(true);
  
  // Dialog states
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Form states
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: ''
  });
  
  const [accountSettings, setAccountSettings] = useState({
    accountName: 'TechCorp Solutions',
    domain: 'techcorp.com',
    description: 'A leading technology solutions provider specializing in cloud infrastructure and enterprise software development.',
    plan: 'Enterprise',
    timezone: 'UTC-5',
    language: 'English'
  });

  // Form errors
  const [userErrors, setUserErrors] = useState<{[key: string]: string}>({});
  const [settingsErrors, setSettingsErrors] = useState<{[key: string]: string}>({});

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate metrics loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetricsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const dashboardMetrics = {
    totalUsers: 127,
    activeUsers: 95,
    mfaEnabled: 89,
    pendingInvitations: 12,
    failedLogins: 3,
    passwordExpiring: 8
  };

  const availableRoles = [
    'Administrator',
    'User Manager',
    'Project Manager',
    'Developer',
    'Analyst',
    'Viewer'
  ];

  const handleCreateUser = () => {
    const errors: {[key: string]: string} = {};
    
    if (!newUser.firstName.trim()) errors.firstName = 'First name is required';
    if (!newUser.lastName.trim()) errors.lastName = 'Last name is required';
    if (!newUser.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) errors.email = 'Email is invalid';
    if (!newUser.role) errors.role = 'Role is required';
    
    setUserErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setSnackbarMessage(`User ${newUser.firstName} ${newUser.lastName} created successfully!`);
        setSnackbarOpen(true);
        setCreateUserOpen(false);
        setNewUser({ firstName: '', lastName: '', email: '', role: '', department: '' });
      }, 500);
    }
  };

  const handleSaveSettings = () => {
    const errors: {[key: string]: string} = {};
    
    if (!accountSettings.accountName.trim()) errors.accountName = 'Account name is required';
    if (!accountSettings.domain.trim()) errors.domain = 'Domain is required';
    
    setSettingsErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setSnackbarMessage('Account settings updated successfully!');
        setSnackbarOpen(true);
        setAccountSettingsOpen(false);
      }, 500);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'createUser':
        setCreateUserOpen(true);
        break;
      case 'manageRoles':
        navigate('/app/roles');
        break;
      case 'accountSettings':
        navigate('/app/account/settings');
        break;
    }
  };

  const recentActivity = [
    {
      action: 'User "Sarah Chen" enabled MFA',
      time: '2 minutes ago',
      type: 'security',
      severity: 'success'
    },
    {
      action: 'New user "Alex Rodriguez" invited',
      time: '1 hour ago',
      type: 'user',
      severity: 'info'
    },
    {
      action: 'Role "Project Manager" permissions updated',
      time: '3 hours ago',
      type: 'role',
      severity: 'info'
    },
    {
      action: '5 failed login attempts detected',
      time: '6 hours ago',
      type: 'security',
      severity: 'warning'
    },
    {
      action: 'Password policy updated',
      time: '1 day ago',
      type: 'policy',
      severity: 'info'
    }
  ];

  if (loading) {
    return (
      <Box>
        <Skeleton variant="text" width="200px" height={40} sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Skeleton variant="text" width="150px" height={28} sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {[...Array(5)].map((_, i) => (
                <Box key={i} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60px" height={16} />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Skeleton variant="text" width="120px" height={28} sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {[...Array(3)].map((_, i) => (
                <Box key={i} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Skeleton variant="text" width="70%" height={20} />
                  <Skeleton variant="text" width="90%" height={16} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Chip
          label="Live Data"
          color="success"
          size="small"
          icon={<CheckCircleIcon />}
        />
      </Stack>

      {/* Security Alert */}
      {dashboardMetrics.failedLogins > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>{dashboardMetrics.failedLogins} failed login attempts</strong> detected in the last 24 hours. 
          Consider reviewing security logs.
        </Alert>
      )}

      {/* Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)', xl: 'repeat(6, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {metricsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" color="primary">
                      {dashboardMetrics.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Users
                    </Typography>
                  </>
                )}
              </Box>
              <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {metricsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" color="success.main">
                      {dashboardMetrics.activeUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Users
                    </Typography>
                  </>
                )}
              </Box>
              <TrendingUpIcon color="success" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {metricsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" color="info.main">
                      {dashboardMetrics.mfaEnabled}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MFA Enabled
                    </Typography>
                  </>
                )}
              </Box>
              <ShieldIcon color="info" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {metricsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" color="warning.main">
                      {dashboardMetrics.pendingInvitations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Invites
                    </Typography>
                  </>
                )}
              </Box>
              <MailOutlineIcon color="warning" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {metricsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" color="error.main">
                      {dashboardMetrics.failedLogins}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Failed Logins
                    </Typography>
                  </>
                )}
              </Box>
              <WarningIcon color="error" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {metricsLoading ? (
                  <>
                    <Skeleton variant="text" width="60px" height={32} />
                    <Skeleton variant="text" width="100px" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" color="warning.main">
                      {dashboardMetrics.passwordExpiring}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Passwords Expiring
                    </Typography>
                  </>
                )}
              </Box>
              <VpnKeyIcon color="warning" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Recent Activity */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Stack spacing={2}>
            {recentActivity.map((activity, index) => (
              <Box key={index} sx={{ 
                p: 2, 
                bgcolor: activity.severity === 'warning' ? 'warning.light' : 'grey.50', 
                borderRadius: 1,
                borderLeft: 4,
                borderLeftColor: activity.severity === 'warning' ? 'warning.main' : 
                               activity.severity === 'success' ? 'success.main' : 'info.main'
              }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {activity.severity === 'warning' && <WarningIcon color="warning" fontSize="small" />}
                  {activity.severity === 'success' && <CheckCircleIcon color="success" fontSize="small" />}
                  {activity.type === 'security' && activity.severity !== 'warning' && activity.severity !== 'success' && 
                    <SecurityIcon color="info" fontSize="small" />}
                  {activity.type === 'user' && <PeopleIcon color="info" fontSize="small" />}
                  {activity.type === 'role' && <AdminPanelSettingsIcon color="info" fontSize="small" />}
                  {activity.type === 'policy' && <SettingsIcon color="info" fontSize="small" />}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon fontSize="inherit" />
                      {activity.time}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* Quick Actions */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Stack spacing={2}>
            <Tooltip title="Add a new user to your organization">
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                fullWidth
                sx={{ justifyContent: 'flex-start', p: 2 }}
                onClick={() => handleQuickAction('createUser')}
              >
                <Box sx={{ textAlign: 'left', flex: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Create New User
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Add a new user to your account
                  </Typography>
                </Box>
              </Button>
            </Tooltip>
            
            <Tooltip title="Manage user roles and permissions">
              <Button
                variant="outlined"
                startIcon={<AdminPanelSettingsIcon />}
                fullWidth
                sx={{ justifyContent: 'flex-start', p: 2 }}
                onClick={() => handleQuickAction('manageRoles')}
              >
                <Box sx={{ textAlign: 'left', flex: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Manage Roles
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Create or edit user roles
                  </Typography>
                </Box>
              </Button>
            </Tooltip>
            
            <Tooltip title="Configure account settings and policies">
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                fullWidth
                sx={{ justifyContent: 'flex-start', p: 2 }}
                onClick={() => handleQuickAction('accountSettings')}
              >
                <Box sx={{ textAlign: 'left', flex: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Account Settings
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Update account information
                  </Typography>
                </Box>
              </Button>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>

      {/* Create User Dialog */}
      <Dialog open={createUserOpen} onClose={() => setCreateUserOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            Create New User
            <IconButton onClick={() => setCreateUserOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                error={!!userErrors.firstName}
                helperText={userErrors.firstName}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                error={!!userErrors.lastName}
                helperText={userErrors.lastName}
                fullWidth
                required
              />
            </Stack>
            
            <TextField
              label="Email Address"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              error={!!userErrors.email}
              helperText={userErrors.email}
              fullWidth
              required
            />
            
            <FormControl fullWidth required error={!!userErrors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                label="Role"
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                {availableRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              {userErrors.role && <FormHelperText>{userErrors.role}</FormHelperText>}
            </FormControl>
            
            <TextField
              label="Department (Optional)"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setCreateUserOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateUser}>
            Create User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Account Settings Dialog */}
      <Dialog open={accountSettingsOpen} onClose={() => setAccountSettingsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            Account Settings
            <IconButton onClick={() => setAccountSettingsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Account Name"
              value={accountSettings.accountName}
              onChange={(e) => setAccountSettings({ ...accountSettings, accountName: e.target.value })}
              error={!!settingsErrors.accountName}
              helperText={settingsErrors.accountName}
              fullWidth
              required
            />
            
            <Stack direction="row" spacing={2}>
              <TextField
                label="Domain"
                value={accountSettings.domain}
                onChange={(e) => setAccountSettings({ ...accountSettings, domain: e.target.value })}
                error={!!settingsErrors.domain}
                helperText={settingsErrors.domain}
                fullWidth
                required
              />
              <FormControl fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select
                  value={accountSettings.plan}
                  label="Plan"
                  onChange={(e) => setAccountSettings({ ...accountSettings, plan: e.target.value })}
                >
                  <MenuItem value="Starter">Starter</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            
            <TextField
              label="Description"
              value={accountSettings.description}
              onChange={(e) => setAccountSettings({ ...accountSettings, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={accountSettings.timezone}
                  label="Timezone"
                  onChange={(e) => setAccountSettings({ ...accountSettings, timezone: e.target.value })}
                >
                  <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                  <MenuItem value="UTC-7">Mountain Time (UTC-7)</MenuItem>
                  <MenuItem value="UTC-6">Central Time (UTC-6)</MenuItem>
                  <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                  <MenuItem value="UTC+0">UTC</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={accountSettings.language}
                  label="Language"
                  onChange={(e) => setAccountSettings({ ...accountSettings, language: e.target.value })}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="German">German</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setAccountSettingsOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
