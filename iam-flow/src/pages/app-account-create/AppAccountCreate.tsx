import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import type { AccountCreateForm } from '../../models/form/AccountCreateForm';
import { AccountStep, PersonalStep, OTPStep, PasswordStep, FormProvider } from './components';

// Steps configuration
const stepsConfig = [
  {
    label: 'Account Info',
    component: <AccountStep />,
    fields: ['accountName', 'accountType'] as (keyof AccountCreateForm)[]
  },
  {
    label: 'Basic Info',
    component: <PersonalStep />,
    fields: ['firstName', 'lastName', 'email'] as (keyof AccountCreateForm)[]
  },
  {
    label: 'OTP Verification',
    component: <OTPStep />,
    fields: ['otp'] as (keyof AccountCreateForm)[]
  },
  {
    label: 'Set Password',
    component: <PasswordStep />,
    fields: ['password', 'confirmPassword'] as (keyof AccountCreateForm)[]
  }
];

export default function AppAccountCreate() {

  const [activeStep, setActiveStep] = useState(0);

  const formMethods = useForm<AccountCreateForm>({
    mode: 'onTouched'
  });

  const { handleSubmit, trigger } = formMethods;

  const getStepFields = (step: number): (keyof AccountCreateForm)[] => {
    return stepsConfig[step]?.fields || [];
  };

  const handleNext = async () => {
    const fieldsToValidate = getStepFields(activeStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      const nextStep = activeStep + 1;  
      setActiveStep(nextStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish: SubmitHandler<AccountCreateForm> = (data) => {
    console.log('Form submitted:', data);
    alert('Account created successfully!');
  };

  const renderStepContent = () => {
    return stepsConfig[activeStep]?.component;
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h5" mb={2} gutterBottom align='left'>
          Account Creation
        </Typography>
        
        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {stepsConfig.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(handleFinish)}>
            <Box sx={{ mb: 4 }}>
              {renderStepContent()}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === stepsConfig.length - 1 ? (
                <Button type="submit" variant="contained">
                  Finish
                </Button>
              ) : (
                <Button onClick={handleNext} variant="contained">
                  Next
                </Button>
              )}
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}

