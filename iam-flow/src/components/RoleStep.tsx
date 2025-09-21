import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText,
  Typography,
  Chip
} from "@mui/material";
import type { RoleStepForm } from "../models/form/RoleStepForm";

// Example roles, replace with your actual roles or fetch from API
const availableRoles = [
  "Admin",
  "User Manager",
  "User",
  "Account Owner",
  "Developer"
];

export default function RoleStep() {
  const { control } = useFormContext<RoleStepForm>();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Assign Roles
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select one or more roles for this user. Roles determine what actions the user can perform in the system.
      </Typography>
      <Controller
        name="roles"
        control={control}
        rules={{ required: "At least one role must be selected" }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel id="role-select-label">Roles</InputLabel>
            <Select
              labelId="role-select-label"
              multiple
              value={field.value || []}
              onChange={(event) => {
                const value = event.target.value;
                // Handle the case where the value is not an array (shouldn't happen with multiple select)
                if (!Array.isArray(value)) return;
                field.onChange(value);
              }}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => {
                        const newValue = (field.value || []).filter((role: string) => role !== value);
                        field.onChange(newValue);
                      }}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  ))}
                </Box>
              )}
            >
              <MenuItem
                dense
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                onClick={(event) => {
                  // Prevent the Select from closing
                  event.stopPropagation();
                  const allSelected = (field.value || []).length === availableRoles.length;
                  // Toggle between all selected and none selected
                  field.onChange(allSelected ? [] : availableRoles);
                }}
              >
                <Checkbox
                  checked={(field.value || []).length === availableRoles.length}
                  indeterminate={(field.value || []).length > 0 && (field.value || []).length < availableRoles.length}
                  onClick={(event) => {
                    // Prevent triggering the MenuItem click
                    event.stopPropagation();
                    const target = event.target as HTMLInputElement;
                    field.onChange(target.checked ? availableRoles : []);
                  }}
                />
                <ListItemText
                  primary={(field.value || []).length === availableRoles.length ? "Deselect All" : "Select All"}
                />
              </MenuItem>
              {availableRoles.map((role) => (
                <MenuItem
                  key={role}
                  value={role}
                  onClick={(event) => {
                    // Prevent the Select from closing
                    event.stopPropagation();
                    const currentValue = field.value || [];
                    const newValue = currentValue.includes(role)
                      ? currentValue.filter(r => r !== role)
                      : [...currentValue, role];
                    field.onChange(newValue);
                  }}
                >
                  <Checkbox
                    checked={(field.value || []).includes(role)}
                    onClick={(event) => {
                      // Prevent triggering the MenuItem click
                      event.stopPropagation();
                      const target = event.target as HTMLInputElement;
                      const currentValue = field.value || [];
                      const newValue = target.checked
                        ? [...currentValue, role]
                        : currentValue.filter(r => r !== role);
                      field.onChange(newValue);
                    }}
                  />
                  <ListItemText primary={role} />
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
}
