import jwt from 'jsonwebtoken';

// Activate account
export function createActivateAccountToken(payload) {
  return jwt.sign(payload, process.env.ACTIVATE_ACCOUNT_JWT_SECRET, {
    expiresIn: process.env.ACTIVATE_ACCOUNT_JWT_EXPIRES_IN,
  });
}

export function verifyActivateAccountToken(token) {
  return jwt.verify(token, process.env.ACTIVATE_ACCOUNT_JWT_SECRET);
}

// Reset password
export function createResetPasswordToken(payload) {
  return jwt.sign(payload, process.env.RESET_PASSWORD_JWT_SECRET, {
    expiresIn: process.env.RESET_PASSWORD_JWT_EXPIRES_IN,
  });
}

export function verifyResetPasswordToken(token) {
  return jwt.verify(token, process.env.RESET_PASSWORD_JWT_SECRET);
}

// Auth
export function createAuthToken(payload) {
  return jwt.sign(payload, process.env.AUTH_JWT_SECRET, {
    expiresIn: process.env.AUTH_JWT_EXPIRES_IN,
  });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, process.env.AUTH_JWT_SECRET);
}
