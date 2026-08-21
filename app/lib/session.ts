import crypto from 'node:crypto'

// Stateless, HMAC-signed session token — no external session library needed.
// This module is intentionally free of `next/headers` imports so it is safe to
// import from `proxy.ts` (which runs before the request context exists).

export const SESSION_COOKIE = 'portfolio_session'
export const SESSION_MAX_AGE_S = 7 * 24 * 60 * 60 // 7 days

export type SessionPayload = { email: string; name?: string | null }
type SignedPayload = SessionPayload & { exp: number }

const SECRET = process.env.SESSION_SECRET ?? ''

function hmac(body: string): string {
  return crypto.createHmac('sha256', SECRET).update(body).digest('base64url')
}

// token = base64url(JSON payload).base64url(HMAC-SHA256 of that payload)
export function signSession(payload: SessionPayload): string {
  const data: SignedPayload = { ...payload, exp: Date.now() + SESSION_MAX_AGE_S * 1000 }
  const body = Buffer.from(JSON.stringify(data)).toString('base64url')
  return `${body}.${hmac(body)}`
}

export function verifySessionToken(token?: string | null): SessionPayload | null {
  if (!token || !SECRET) return null

  const [body, sig] = token.split('.')
  if (!body || !sig) return null

  // Constant-time signature check.
  const expected = hmac(body)
  const sigBuf = Buffer.from(sig)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null
  }

  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString()) as SignedPayload
    if (typeof data.exp !== 'number' || data.exp < Date.now()) return null
    return { email: data.email, name: data.name ?? null }
  } catch {
    return null
  }
}
