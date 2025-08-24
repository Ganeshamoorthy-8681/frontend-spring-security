import { useState } from 'react';
import { useNavigate } from 'react-router';
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
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

export default function AppAccountSettings() {
  const navigate = useNavigate();
  
  const [accountSettings, setAccountSettings] = useState({
    accountName: 'TechCorp Solutions',
    domain: 'techcorp.com',
    description: 'A leading technology solutions provider specializing in cloud infrastructure and enterprise software development.',
    plan: 'Enterprise',
    timezone: 'UTC-5',
    language: 'English',
    industry: 'Technology',
    companySize: '100-500',
    phoneNumber: '+1-555-0123',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    billingEmail: 'billing@techcorp.com'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const validationErrors: {[key: string]: string} = {};
    
    if (!accountSettings.accountName.trim()) {
      validationErrors.accountName = 'Account name is required';
    }
    if (!accountSettings.domain.trim()) {
      validationErrors.domain = 'Domain is required';
    }
    if (!accountSettings.billingEmail.trim()) {
      validationErrors.billingEmail = 'Billing email is required';
    } else if (!/\S+@\S+\.\S+/.test(accountSettings.billingEmail)) {
      validationErrors.billingEmail = 'Invalid email format';
    }
    
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSnackbarOpen(true);
      }, 1000);
    }
  };

  const handleCancel = () => {
    navigate('/app/account');
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={handleCancel} sx={{ p: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1">
            Account Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account information and preferences
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Main Settings */}
        <Stack spacing={3}>
          {/* Basic Information */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <BusinessIcon color="primary" />
              <Typography variant="h6">
                Basic Information
              </Typography>
            </Stack>
            
            <Stack spacing={3}>
              <TextField
                label="Account Name"
                value={accountSettings.accountName}
                onChange={(e) => setAccountSettings({ ...accountSettings, accountName: e.target.value })}
                error={!!errors.accountName}
                helperText={errors.accountName}
                fullWidth
                required
              />
              
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Domain"
                  value={accountSettings.domain}
                  onChange={(e) => setAccountSettings({ ...accountSettings, domain: e.target.value })}
                  error={!!errors.domain}
                  helperText={errors.domain}
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
            </Stack>
          </Paper>

          {/* Company Details */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Company Details
            </Typography>
            
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={accountSettings.industry}
                    label="Industry"
                    onChange={(e) => setAccountSettings({ ...accountSettings, industry: e.target.value })}
                  >
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    value={accountSettings.companySize}
                    label="Company Size"
                    onChange={(e) => setAccountSettings({ ...accountSettings, companySize: e.target.value })}
                  >
                    <MenuItem value="1-10">1-10 employees</MenuItem>
                    <MenuItem value="11-50">11-50 employees</MenuItem>
                    <MenuItem value="51-100">51-100 employees</MenuItem>
                    <MenuItem value="100-500">100-500 employees</MenuItem>
                    <MenuItem value="500+">500+ employees</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              
              <TextField
                label="Phone Number"
                value={accountSettings.phoneNumber}
                onChange={(e) => setAccountSettings({ ...accountSettings, phoneNumber: e.target.value })}
                fullWidth
              />
              
              <TextField
                label="Address"
                value={accountSettings.address}
                onChange={(e) => setAccountSettings({ ...accountSettings, address: e.target.value })}
                multiline
                rows={2}
                fullWidth
              />
              
              <TextField
                label="Billing Email"
                type="email"
                value={accountSettings.billingEmail}
                onChange={(e) => setAccountSettings({ ...accountSettings, billingEmail: e.target.value })}
                error={!!errors.billingEmail}
                helperText={errors.billingEmail}
                fullWidth
                required
              />
            </Stack>
          </Paper>

          {/* Preferences */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Preferences
            </Typography>
            
            <Stack spacing={3}>
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
                    <MenuItem value="UTC+1">Central European Time (UTC+1)</MenuItem>
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
                    <MenuItem value="Italian">Italian</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        {/* Summary Sidebar */}
        <Stack spacing={3}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Account Summary
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Current Plan
                </Typography>
                <Chip 
                  label={accountSettings.plan} 
                  color="primary" 
                  size="small" 
                />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Domain
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {accountSettings.domain}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Industry
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {accountSettings.industry}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Company Size
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {accountSettings.companySize}
                </Typography>
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
                onClick={() => navigate('/app/account')}
              >
                View Account Details
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/app/users')}
              >
                Manage Users
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
          Account settings updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
