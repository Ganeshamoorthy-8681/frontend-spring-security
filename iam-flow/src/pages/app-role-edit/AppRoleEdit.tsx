import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import {
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Alert,
  Skeleton,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { RoleForm } from '../../components';
import type { RoleEditForm } from '../../models/form/RoleEditForm';

// Mock role data - replace with actual API call
const mockRoleData = {
  '1': {
    id: '1',
    name: 'Account Owner',
    description: 'Full access to all account features and settings',
    permissions: ['admin.full']
  },
  '2': {
    id: '2',
    name: 'Admin',
    description: 'Administrative access with user and role management',
    permissions: ['users.read', 'users.write', 'users.delete', 'roles.read', 'roles.write', 'account.read']
  },
  '3': {
    id: '3',
    name: 'User Manager',
    description: 'Can manage users but not roles or account settings',
    permissions: ['users.read', 'users.write', 'account.read']
  }
};

export default function AppRoleEdit() {
  const navigate = useNavigate();
  const { roleId } = useParams<{ roleId: string; }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const formMethods = useForm<RoleEditForm>({
    mode: 'onChange'
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    const loadRoleData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const roleData = mockRoleData[roleId as keyof typeof mockRoleData];

        if (!roleData) {
          setLoadError('Role not found');
          return;
        }

        // Populate form with existing data
        reset({
          id: roleData.id,
          name: roleData.name,
          description: roleData.description,
          permissions: roleData.permissions
        });

      } catch (error) {
        console.error('Error loading role:', error);
        setLoadError('Failed to load role data');
      } finally {
        setIsLoading(false);
      }
    };

    if (roleId) {
      loadRoleData();
    }
  }, [roleId, reset]);

  const handleBack = () => {

    navigate(`/app/roles/${roleId}`);
  };

  const handleUpdateRole: SubmitHandler<RoleEditForm> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Simulate API call
      console.log('Updating role:', data);

      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message and navigate back
      alert('Role updated successfully!');
      navigate(`/app/roles/${roleId}`);

    } catch (error) {
      console.error('Error updating role:', error);
      setSubmitError('Failed to update role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <Box>
        <Paper>
          <Toolbar className="toolbar">
            <div className="toolbar-action">
              <IconButton size="medium" onClick={handleBack} sx={{ p: 1 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                Edit Role
              </Typography>
            </div>
          </Toolbar>
        </Paper>
        <div className="page-content" style={{ maxWidth: 1024, margin: '0 auto' }}>
          <Alert severity="error">
            {loadError}
          </Alert>
        </div>
      </Box>
    );
  }

  return (
    <Box>
      <Paper>
        <Toolbar className="toolbar">
          <div className="toolbar-action">
            <IconButton
              size="medium"
              onClick={handleBack}
              sx={{ p: 1 }}
              disabled={isSubmitting || isLoading}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Edit Role
            </Typography>
          </div>
        </Toolbar>
      </Paper>

      <div className="page-content">
        <Box>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          {isLoading ? (
            <Box>
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Skeleton variant="text" height={32} width={200} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={56} sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={120} />
              </Paper>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Skeleton variant="text" height={32} width={150} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={200} />
              </Paper>
            </Box>
          ) : (
            <FormProvider {...formMethods}>
              <form
                id="role-edit-form"
                onSubmit={handleSubmit(handleUpdateRole)}
              >
                <RoleForm isEditMode={true} />
              </form>
            </FormProvider>
          )}
        </Box>
      </div>
      {/* Save/Cancel Buttons */}
      <Paper style={{ padding: '1rem', position: 'absolute', bottom: 0, width: '100%', zIndex: 2 }} elevation={2} sx={{ p: 2, mt: 3 }} >
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={isSubmitting ? <CircularProgress size={16} /> : <SaveIcon />}
            type="submit"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
