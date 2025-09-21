import { useState } from 'react';
import { Box, Button, Typography, Paper, Divider } from '@mui/material';
import { Link } from 'react-router';
import AppLogin from '../app-login/AppLogin';
import type { LoginForm } from '../../models/form/LoginForm';

export default function LoginDemo() {
  const [loginData, setLoginData] = useState<LoginForm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);
    setError('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate validation
      if (data.email === 'admin@example.com' && data.password === 'password') {
        setLoginData(data);
        setError('');
      } else {
        throw new Error('Invalid credentials. Try admin@example.com / password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLoginData(null);
    setError('');
  };

  if (loginData) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper sx={{ p: 4, maxWidth: 500, width: '100%' }}>
          <Typography variant="h4" gutterBottom color="success.main">
            Login Successful! 🎉
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Login Details:
          </Typography>
          
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 3 }}>
            <Typography><strong>Type:</strong> {loginData.loginType === 'user' ? 'User Login' : 'Root Login'}</Typography>
            <Typography><strong>Email:</strong> {loginData.email}</Typography>
            {loginData.accountId && (
              <Typography><strong>Account ID:</strong> {loginData.accountId}</Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleReset}>
              Try Again
            </Button>
            <Button variant="outlined" component={Link} to="/app/dashboard">
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <AppLogin 
      onLogin={handleLogin}
      loading={loading}
      error={error}
    />
  );
}
