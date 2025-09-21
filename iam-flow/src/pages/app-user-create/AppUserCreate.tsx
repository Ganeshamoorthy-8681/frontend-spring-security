import { Box, Button, Paper, Step, StepLabel, Stepper, Toolbar, Typography } from "@mui/material";
import { PersonalStep } from "../app-account-create/components";
import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type { UserCreateForm } from "../../models/form/UserCreateForm";
import RoleStep from "../../components/RoleStep";

const stepsConfig = [
  {
    label: 'Basic Info',
    component: <PersonalStep />,
    fields: ['firstName', 'lastName', 'email'] as (keyof UserCreateForm)[]
  },
  {
    label: 'Roles',
    component: <RoleStep />,
    fields: ['roles'] as (keyof UserCreateForm)[]
  }
];


export default function AppUserCreate() {


  const [activeStep, setActiveStep] = useState(0);


  const formMethods = useForm<UserCreateForm>({
    mode: 'onChange'
  });

  const { handleSubmit, trigger, formState: { isValid } } = formMethods;

  const getStepFields = (step: number): (keyof UserCreateForm)[] => {
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

  const handleFinish: SubmitHandler<UserCreateForm> = (data) => {
    console.log('Form submitted:', data);
    alert('Account created successfully!');
  };

  const renderStepContent = () => {
    return stepsConfig[activeStep]?.component;
  };

  return (
    <Box>
      <Paper>
        <Toolbar className='toolbar'>
          <Typography variant="h6" gutterBottom>
            Create New User
          </Typography>
        </Toolbar>
      </Paper>
      <div className="page-content" style={{ maxWidth: 1024, margin: '0 auto' }}>
        <Box>
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
            <Box sx={{ mb: 4, mt: 4 }}>
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
                <Button type="submit" variant="contained" disabled={!isValid}>
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
      </div>
    </Box>
  );
}
