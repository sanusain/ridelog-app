type OAuthType = "android" | "standalone"

const prodAndroidOAuthClientId =
  "931489511293-l561q0pdj13eppsqavsehc3e3tm8pje8.apps.googleusercontent.com"

const standAloneOAuthClientId =
  "931489511293-bnmtfchdu0al27p1t8065mejt0viscv2.apps.googleusercontent.com"

export function getOAuthClientId(type: OAuthType) {
  if (type === "android") return prodAndroidOAuthClientId
  return standAloneOAuthClientId
}
