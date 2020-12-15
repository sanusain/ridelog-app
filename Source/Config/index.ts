export function getServer(): string {
  // const testServer = '10.0.2.2:7000'
  const testServer = 'https://test-ridelogg-backend.herokuapp.com'
  const prodServer = 'https://ridelogg-backend.herokuapp.com'
  // if (local) return localServer
  if (__DEV__) return testServer
  return prodServer
}
