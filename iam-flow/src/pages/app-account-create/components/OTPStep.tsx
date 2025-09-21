import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { authService } from "../../../services";
import { toast } from 'react-toastify';

export default function OTPStep() {
  const { register, formState: { errors }, watch } = useFormContext();
  const [loading, setLoading] = useState(false);

  // Watch form values to get email
  const email = watch('email');

  function resendOtp() {
    try {
      setLoading(true);
      authService.resendOtp(email);
      setLoading(false);
      toast.success("Otp has been resend to email.");
    } catch (e) {
      setLoading(false);
      toast.error("Failed to sent otp." + e);
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="body1" gutterBottom>
        Please enter the 6-digit OTP sent to your email address.
      </Typography>

      {email && (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          OTP sent to: <strong>{email}</strong>
        </Typography>
      )}

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
        placeholder="Enter 6-digit code"
        fullWidth
        autoComplete="one-time-code"
        inputProps={{
          maxLength: 6,
          style: { textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.5rem' }
        }}
        error={!!(errors.otp)}
        helperText={errors.otp ? (errors.otp?.message as string) : 'Enter the 6-digit code from your email'}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Didn't receive the code?
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={() => resendOtp()}
          startIcon={loading && <CircularProgress size={16} />}
        >
          Resend
        </Button>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
        The OTP will expire in 10 minutes. If you don't receive it, check your spam folder.
      </Typography>
    </Stack>
  );
}
