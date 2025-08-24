import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormContext } from 'react-hook-form';

export default function OTPStep() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <Stack spacing={3}>
      <Typography variant="body1" gutterBottom>
        Please enter the 6-digit OTP sent to your email address.
      </Typography>
      <TextField
        {...register('otp', {
          required: 'OTP is required',
          minLength: { value: 6, message: 'OTP must be 6 digits' },
          maxLength: { value: 6, message: 'OTP must be 6 digits' },
          pattern: {
            value: /^\d{6}$/,
            message: 'OTP must be 6 digits'
          }
        })}
        label="OTP"
        fullWidth
        autoComplete="one-time-code"
        inputProps={{ maxLength: 6 }}
        error={!!(errors.otp)}
        helperText={errors.otp ? (errors.otp?.message as string) : ''}
      />
    </Stack>
  );
}
