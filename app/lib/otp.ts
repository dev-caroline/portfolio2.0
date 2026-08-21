import crypto from 'node:crypto'

// One-time-password policy for email verification.
export const OTP_TTL_MS = 10 * 60 * 1000 // codes are valid for 10 minutes
export const MAX_ATTEMPTS = 5 // wrong guesses allowed before a code is locked

// Uniformly-random 6-digit code, zero-padded (e.g. "004217").
export function generateOtp(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')
}

// We never store the raw code — only its hash — so a DB leak can't reveal it.
export function hashOtp(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex')
}
