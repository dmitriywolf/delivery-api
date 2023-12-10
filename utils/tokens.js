import jwt from 'jsonwebtoken';

// Verify email
export function createVerifyEmailToken(payload) {
  return jwt.sign(payload, process.env.VERIFY_JWT_SECRET, {
    expiresIn: process.env.VERIFY_JWT_EXPIRES_IN,
  });
}

export function checkVerifyEmailToken(token) {
  return jwt.verify(token, process.env.VERIFY_JWT_SECRET);
}

// Reset password
export function createResetPasswordToken(payload) {
  return jwt.sign(payload, process.env.RESET_PASS_JWT_SECRET, {
    expiresIn: process.env.RESET_PASS_JWT_EXPIRES_IN,
  });
}

export function checkResetPasswordToken(token) {
  return jwt.verify(token, process.env.RESET_PASS_JWT_SECRET);
}

// Auth
export function createAuthToken(payload) {
  return jwt.sign(payload, process.env.AUTH_JWT_SECRET, {
    expiresIn: process.env.AUTH_JWT_EXPIRES_IN,
  });
}

export function checkAuthToken(token) {
  return jwt.verify(token, process.env.AUTH_JWT_SECRET);
}
