import { apiClient } from './ApiClient';
import type { RootLoginRequest } from '../models/request/RootLoginRequest';
import type { LoginRequest } from '../models/request/LoginRequest';
import type { SetPasswordRequest } from '../models/request/SetPasswordRequest';
import { jwtDecode } from "jwt-decode";
import type { AxiosResponse } from 'axios';
import type { OtpValidationRequest } from '../models/request/OtpValidationRequest';
import type { OtpValidationResponse } from '../models/response/OtpValidationResponse';
import type { UserResponse } from '../models/response/UserResponse';
import { configService } from './config/ConfigService';


/**
 * Authentication Service Implementation
 * Handles authentication, authorization, and session management following standard practices
 */
// TODO: Need to separate the service like login and password and token and sessions
export class AuthService {

  private token: string | null = null;

  private tokenExpiry: number = 0;

  private currentUser: UserResponse | null = null;

  private readonly TOKEN_STORAGE_KEY = 'auth_access_token';

  private readonly TOKEN_EXPIRY = "token_expiry";

  protected readonly apiClient = apiClient;

  // Login operations
  async login(request: LoginRequest): Promise<void> {

    try {
      const response = await this.apiClient.post(
        `/api/v1/auth/login`,
        request
      );

      if (response.status === 200) {
        this.extractJwtToken(response);
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  extractJwtToken(response: AxiosResponse): void {
    const authHeader = response.headers['authorization'] || response.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      this.setToken(authHeader.substring(7));
      this.setTokenExpiryTime();
    }
  }

  async rootLogin(request: RootLoginRequest): Promise<void> {
    try {
      const response = await this.apiClient.post(
        `/api/v1/auth/root-login`,
        request
      );

      if (response.status === 200) {
        this.extractJwtToken(response);
      }

    } catch (error) {
      console.error('Root login failed', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.clearSession();
  }


  // OTP operations
  async validateOtp(request: OtpValidationRequest): Promise<OtpValidationResponse> {
    const response = await this.apiClient.post<OtpValidationResponse>(
      `/api/v1/otp/validate`,
      request
    );
    return response.data;
  }

  async resendOtp(email: string): Promise<void> {
    await this.apiClient.post(
      `/api/v1/otp/resend`,
      { email }
    );
  }


  // Password management
  async setPassword(accountId: number, request: SetPasswordRequest): Promise<void> {
    await this.apiClient.post(
      `/api/v1/accounts/${accountId}/users/set-password`,
      request
    );
  }

  // async changePassword(request: PasswordChangeRequest): Promise<void> {
  //   if (request.newPassword !== request.confirmPassword) {
  //     throw new Error('New password and confirmation do not match');
  //   }
  //   await this.apiClient.post(
  //     `/auth/change-password`,
  //     {
  //       currentPassword: request.currentPassword,
  //       newPassword: request.newPassword
  //     }
  //   );
  // }


  // async confirmPasswordReset(request: PasswordResetConfirmRequest): Promise<void> {
  //   if (request.newPassword !== request.confirmPassword) {
  //     throw new Error('New password and confirmation do not match');
  //   }
  //   await this.apiClient.post(
  //     `${this.baseEndpoint}/auth/password-reset/confirm`,
  //     {
  //       token: request.token,
  //       password: request.newPassword
  //     }
  //   );
  // }

  // Session management
  async getCurrentUser(): Promise<UserResponse> {
    if (!this.isAuthenticated() && configService.getEnvironment() != "development") {
      throw new Error('User is not authenticated');
    }

    if (this.currentUser) {
      return this.currentUser;
    }
    const response = await this.apiClient.get<UserResponse>(
      `/api/v1/auth/whoami`
    );
    this.currentUser = response.data;
    return response.data;
  }



  // Utility methods
  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiry = this.getTokenExpiryTime();


    if (!token || !expiry) {
      return false;
    }
    const isExpired = Date.now() < expiry;
    return isExpired;
  }


  // Token management
  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
  }

  public getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(this.TOKEN_STORAGE_KEY);
    }
    return this.token;
  }

  public clearToken(): void {
    this.token = null;
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
  }

  getTokenExpiryTime(): number {
    if (!this.tokenExpiry) {
      const exp = localStorage.getItem(this.TOKEN_EXPIRY);
      if (exp) {
        this.tokenExpiry = parseInt(exp);
      }
    }
    return this.tokenExpiry;
  }

  setTokenExpiryTime() {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      const exp = decoded.exp;
      if (exp) {
        this.tokenExpiry = exp;
        localStorage.setItem(this.TOKEN_EXPIRY, exp.toString());
      }
    }
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY);
  }



}
