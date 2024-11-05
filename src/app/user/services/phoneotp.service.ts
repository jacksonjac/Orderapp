import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential, ConfirmationResult } from '@angular/fire/auth'; 

@Injectable({
  providedIn: 'root'
})
export class PhoneotpService {
  constructor(private auth: Auth) {}

  async sendVerificationCode(phoneNumber: string): Promise<ConfirmationResult> {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
    // Send the verification code and return the confirmation result
    return signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
  }

  async verifyCode(verificationId: string, verificationCode: string): Promise<any> {
    // Create credential using PhoneAuthProvider
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    // Use signInWithCredential from the auth object
    return signInWithCredential(this.auth, credential);
  }
}
