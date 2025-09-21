export class OtpStubBackend {

  private simulateDelay(ms: number = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * POST /api/v1/otp
   */
  async generateOtp(email: string): Promise<string> {
    await this.simulateDelay();

    // Simulate OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);

    return otp;
  }
  /**
   * POST /api/v1/otp/verify
   */
  async verifyOtp(email: string, otp: number): Promise<boolean> {
    await this.simulateDelay();

    console.log(`Verifying OTP for ${email}: ${otp}`);

    const isValid = true;
    console.log(`OTP verification for ${email}: ${isValid ? 'successful' : 'failed'}`);
    return isValid;
  }
} 
