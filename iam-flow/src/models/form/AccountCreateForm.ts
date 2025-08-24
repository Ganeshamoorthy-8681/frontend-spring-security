

export const AccountType = {
  ORGANIZATION: 'ORGANIZATION',
  INDIVIDUAL: 'INDIVIDUAL',
} as const;

export type AccountType = typeof AccountType[keyof typeof AccountType];

export interface AccountCreateForm {
  // Step 1 - Account Info
  accountName: string;
  accountDescription?: string;
  accountType: AccountType;
  
  // Step 2 - Personal Info
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  personalDescription?: string;
  
  // Step 3 - OTP
  otp: string;
  
  // Step 4 - Password
  password: string;
  confirmPassword: string;
}
