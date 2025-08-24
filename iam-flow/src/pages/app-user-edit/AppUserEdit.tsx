import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import CloseIcon from '@mui/icons-material/Close';

export default function AppUserEdit() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    role: '',
    status: 'active',
    mfaEnabled: false,
    isVerified: true
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock user data
      setUserData({
        firstName: 'Sarah',
        lastName: 'Chen',
        email: 'sarah.chen@techcorp.com',
        phone: '+1-555-0234',
        department: 'Engineering',
        position: 'Senior Developer',
        role: 'Developer',
        status: 'active',
        mfaEnabled: true,
        isVerified: true
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [userId]);

  const availableRoles = [
    'Administrator',
    'User Manager',
    'Project Manager',
    'Developer',
    'Analyst',
    'Viewer'
  ];

  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Support',
    'HR',
    'Finance'
  ];

  const handleSave = async () => {
    const validationErrors: {[key: string]: string} = {};
    
    if (!userData.firstName.trim()) {
      validationErrors.firstName = 'First name is required';
    }
    if (!userData.lastName.trim()) {
      validationErrors.lastName = 'Last name is required';
    }
    if (!userData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      validationErrors.email = 'Invalid email format';
    }
    if (!userData.role) {
      validationErrors.role = 'Role is required';
    }
    
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setSaving(true);
      // Simulate API call
      setTimeout(() => {
        setSaving(false);
        setSnackbarOpen(true);
      }, 1000);
    }
  };

  const handleCancel = () => {
    navigate(`/app/users/${userId}`);
  };

  const handleViewSummary = () => {
    navigate(`/app/users/${userId}`);
  };

  if (loading) {
    return (
      <Box>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={48} height={48} />
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
              <Stack spacing={3}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} variant="rectangular" height={56} />
                ))}
              </Stack>
            </Paper>
          </Stack>
          
          <Stack spacing={3}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Skeleton variant="text" width="120px" height={28} sx={{ mb: 2 }} />
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={36} sx={{ mb: 2 }} />
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
        <IconButton onClick={handleCancel} sx={{ p: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {userData.firstName[0]}{userData.lastName[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1">
            Edit User
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update user information and settings
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Main Form */}
        <Stack spacing={3}>
          {/* Personal Information */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6">
                Personal Information
              </Typography>
            </Stack>
            
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="First Name"
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  fullWidth
                  required
                />
                <TextField
                  label="Last Name"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  fullWidth
                  required
                />
              </Stack>
              
              <TextField
                label="Email Address"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
              />
              
              <TextField
                label="Phone Number"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                fullWidth
              />
              
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={userData.department}
                    label="Department"
                    onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Position"
                  value={userData.position}
                  onChange={(e) => setUserData({ ...userData, position: e.target.value })}
                  fullWidth
                />
              </Stack>
            </Stack>
          </Paper>

          {/* Account & Security */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">
                Account & Security
              </Typography>
            </Stack>
            
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth required error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={userData.role}
                    label="Role"
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                  >
                    {availableRoles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={userData.status}
                    label="Status"
                    onChange={(e) => setUserData({ ...userData, status: e.target.value })}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.mfaEnabled}
                      onChange={(e) => setUserData({ ...userData, mfaEnabled: e.target.checked })}
                    />
                  }
                  label="Multi-Factor Authentication"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={userData.isVerified}
                      onChange={(e) => setUserData({ ...userData, isVerified: e.target.checked })}
                    />
                  }
                  label="Email Verified"
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        {/* Sidebar */}
        <Stack spacing={3}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Current Settings
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Current Role
                </Typography>
                <Chip 
                  label={userData.role || 'Not assigned'} 
                  color={userData.role ? 'primary' : 'default'}
                  size="small" 
                />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip 
                  label={userData.status} 
                  color={userData.status === 'active' ? 'success' : 'default'}
                  size="small" 
                />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {userData.department || 'Not assigned'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  MFA Status
                </Typography>
                <Chip 
                  label={userData.mfaEnabled ? 'Enabled' : 'Disabled'} 
                  color={userData.mfaEnabled ? 'success' : 'warning'}
                  size="small" 
                />
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleViewSummary}
              >
                View User Summary
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/app/users')}
              >
                All Users
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/app/roles')}
              >
                Manage Roles
              </Button>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Security Actions
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                color="warning"
              >
                Reset Password
              </Button>
              <Button
                variant="outlined"
                fullWidth
                color="error"
              >
                Disable Account
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          action={
            <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          User updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
