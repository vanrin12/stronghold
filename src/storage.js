// @flow

export function storeSessionKey(sessionKey: string) {
  sessionStorage.setItem('sessionKey', sessionKey)
}

export function getStoredSessionKey(): string {
  return sessionStorage.getItem('sessionKey') || ''
}
export function removeStoredSessionKey() {
  return sessionStorage.removeItem('sessionKey')
}
