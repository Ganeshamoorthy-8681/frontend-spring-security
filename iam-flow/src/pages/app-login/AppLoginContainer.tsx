import { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginPage from './AppLogin';
import type { LoginForm } from '../../models/form/LoginForm';
import { authService } from '../../services';

export default function AppLoginContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (loginData: LoginForm) => {
    setLoading(true);
    setError('');

    try {

      if (loginData.loginType === 'root') {
        // Root login - no account ID required
        await authService.rootLogin({
          email: loginData.email,
          password: loginData.password
        });
      } else {
        // User login - account ID required
        if (!loginData.accountId) {
          throw new Error('Account ID is required for user login');
        }

        await authService.login({
          email: loginData.email,
          password: loginData.password,
          accountId: parseInt(loginData.accountId)
        });
      }
      // Navigate to dashboard or appropriate page
      navigate('/app/dashboard');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPage
      onLogin={handleLogin}
      loading={loading}
      error={error}
    />
  );
}
