import { v4 as uuidv4 } from 'uuid'

export const canonicalize = (xmlStr) => {
  // https://github.com/auth0/node-samlp/blob/54d8715926c3066074412138714ad362f5a5f0da/lib/samlp.js#L26-L30
  return xmlStr
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/>(\s*)</g, '><') //unindent
    .trim()
}

export const pemToCert = (pem) => {
  const cert =
    /-----BEGIN CERTIFICATE-----([^-]*)-----END CERTIFICATE-----/g.exec(
      pem.toString()
    )
  return cert[1].replace(/[\n|\r\n]/g, '')
}

export const generateId = () => {
  const uuid = uuidv4().replace(/-/g, '')
  // Prefix with _ to conform with XSD spec. See https://github.com/thameera/saml-mock/issues/4
  return `_${uuid}`
}

export const generateRedirectUrl = (baseUrl, data) => {
  const url = new URL(baseUrl)
  for (const [key, value] of Object.entries(data)) {
    url.searchParams.append(key, value)
  }
  return url.href
}

export const parseConfigParam = (configHex) => {
  /**
   * Decodes a HEX-encoded query string and extracts aud and acsUrl.
   * Returns { aud, acsUrl } or { aud: '', acsUrl: '' } if decode/parse fails.
   */
  if (!configHex) {
    console.log('[DEBUG parseConfigParam] No config provided')
    return { aud: '', acsUrl: '' }
  }

  try {
    console.log('[DEBUG parseConfigParam] Input config:', configHex)
    // Decode hex to UTF-8 string
    const decoded = Buffer.from(configHex, 'hex').toString('utf8')
    console.log('[DEBUG parseConfigParam] Decoded:', decoded)
    // Parse as URLSearchParams to extract aud and acsUrl
    const params = new URLSearchParams(decoded)
    const result = {
      aud: params.get('aud') || '',
      acsUrl: params.get('acs_url') || '',
    }
    console.log('[DEBUG parseConfigParam] Result:', result)
    return result
  } catch (err) {
    // If decode/parse fails, return empty values
    console.error('[DEBUG parseConfigParam] Error:', err.message)
    return { aud: '', acsUrl: '' }
  }
}

export const encodeConfigParam = (aud, acsUrl) => {
  /**
   * Encodes aud and acsUrl as a HEX-encoded query string.
   * No URL encoding needed for HEX - just direct conversion.
   * Returns the HEX string.
   */
  const queryString = `aud=${aud}&acs_url=${acsUrl}`
  return Buffer.from(queryString, 'utf8').toString('hex')
}
