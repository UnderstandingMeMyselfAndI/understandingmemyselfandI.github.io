export async function registerCredential() {
  if (!window.PublicKeyCredential) return null
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: 'Recovery App' },
      user: {
        id: new Uint8Array(16),
        name: 'localUser',
        displayName: 'Local User',
      },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: { userVerification: 'required' },
      timeout: 60000,
    },
  })
  return credential ? credentialToJSON(credential) : null
}

export async function getAssertion() {
  if (!window.PublicKeyCredential) return null
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      timeout: 60000,
      userVerification: 'required',
    },
  })
  return assertion ? credentialToJSON(assertion) : null
}

function credentialToJSON(cred) {
  const obj = {}
  for (let key in cred) {
    const val = cred[key]
    if (val instanceof ArrayBuffer) obj[key] = Array.from(new Uint8Array(val))
    else obj[key] = val
  }
  return obj
}
