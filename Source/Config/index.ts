export function getServer(): string {
  const testServer = 'https://test-ridelogg-backend.herokuapp.com'
  const prodServer = 'https://ridelogg-backend.herokuapp.com'

  if (__DEV__) return testServer
  return prodServer
}
