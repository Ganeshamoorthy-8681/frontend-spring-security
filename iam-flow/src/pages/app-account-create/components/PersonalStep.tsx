import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useFormContext } from 'react-hook-form';

export default function PersonalStep() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...register('firstName', { 
            required: 'First name is required'
          })}
          label="First Name"
          fullWidth
          autoComplete="given-name"
          error={!!(errors.firstName)}
          helperText={errors.firstName? (errors.firstName?.message as string) : ''}
        />
        <TextField
          {...register('lastName', { 
            required: 'Last name is required'
          })}
          label="Last Name"
          fullWidth
          autoComplete="family-name"
          error={!!(errors.lastName )}
          helperText={errors.lastName ? (errors.lastName?.message as string) : ''}
        />
      </Box>
      <TextField
        {...register('middleName')}
        label="Middle Name (Optional)"
        fullWidth
        autoComplete="additional-name"
        error={!!(errors.middleName)}
        helperText={errors.middleName ? (errors.middleName?.message as string) : ''}
      />
      <TextField
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        label="Email"
        type="email"
        fullWidth
        autoComplete="email"
        error={!!(errors.email)}
        helperText={errors.email ? (errors.email?.message as string) : ''}
      />
      <TextField
        {...register('personalDescription')}
        label="Description (Optional)"
        fullWidth
        multiline
        rows={3}
        autoComplete="off"
        error={!!(errors.personalDescription)}
        helperText={errors.personalDescription ? (errors.personalDescription?.message as string) : ''}
      />
    </Stack>
  );
}
