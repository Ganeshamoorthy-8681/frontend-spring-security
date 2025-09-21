import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import {
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Alert,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { RoleForm } from '../../components';
import type { RoleCreateForm } from '../../models/form/RoleCreateForm';

export default function AppRoleCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formMethods = useForm<RoleCreateForm>({
    mode: 'onTouched'
  });

  const { handleSubmit, trigger } = formMethods;

  const handleBack = () => {

    navigate('/app/roles');
  };

  const handleCreateRole: SubmitHandler<RoleCreateForm> = async (data) => {
    try {
      console.log('Form data:', data);
      const isValid = await trigger();

      if (!isValid) return;

      setIsSubmitting(true);

      // Simulate API call
      console.log('Creating role:', data);

      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message and navigate back
      alert('Role created successfully!');
      navigate('/app/roles');

    } catch (error) {
      console.error('Error creating role:', error);
      setSubmitError('Failed to create role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Paper>
        <Toolbar className="toolbar">
          <div className="toolbar-action">
            <IconButton
              size="medium"
              onClick={handleBack}
              sx={{ p: 1 }}
              disabled={isSubmitting}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Create New Role
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

          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleCreateRole)}>
              
              <RoleForm isEditMode={false} />
              <Paper style={{ padding: '1rem', position: 'absolute', bottom: 0, width: '100%', zIndex: 2 }} elevation={2} sx={{ p: 2, mt: 3 }}>
                <Stack direction="row" spacing={2} >
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
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Role'}
                  </Button>
                </Stack>
              </Paper>
            </form>
          </FormProvider>
        </Box>
      </div>

    </Box>
  );
}
