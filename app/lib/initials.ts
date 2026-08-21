// Pure, client-safe helper (no server-only imports) so both the AuthProvider
// (client) and the API routes (server) can derive avatar initials.
export function getInitials(nameOrEmail: string | null | undefined): string {
  if (!nameOrEmail) return '?'
  const raw = nameOrEmail.trim()
  if (!raw) return '?'

  // For emails, only the local part is meaningful for initials.
  const base = raw.includes('@') ? raw.split('@')[0] : raw
  const parts = base.split(/[\s._-]+/).filter(Boolean)

  const letters =
    parts.length >= 2 ? parts[0][0] + parts[1][0] : (parts[0] ?? base).slice(0, 2)

  return letters.toUpperCase()
}
