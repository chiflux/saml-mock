# SAML Mock SP and IdP

Live version at: https://samlmock.dev

## Using the mock IdP

### SP Configuration

- Certificate: Can be downloaded from the top-left button at https://samlmock.dev/idp
- Sign-in URL: Set this to `https://samlmock.dev/idp?config=HEX_CONFIG` where `HEX_CONFIG` is the hexadecimal encoding of `aud=SP_AUDIENCE&acs_url=SP_ACS_URL`.

Example: https://samlmock.dev/idp?config=6175643d75726e3a61757468303a7468616d3a6d6f636b2d73616d6c266163735f75726c3d68747470733a2f2f7468616d2e61757468302e636f6d2f6c6f67696e2f63616c6c6261636b

(The config value decodes to: `aud=urn:auth0:tham:mock-saml&acs_url=https://tham.auth0.com/login/callback`)

**Note:** The old-style URL format with individual `aud` and `acs_url` query parameters is still supported for backward compatibility.

### Doing a SAML flow

1. Initiate a login from the SP.
2. When the Mock IdP screen appears, change any variables as necessary.
3. Click Submit button on top-right. The app will send a SAML response to the SP.

## Running locally

### Using npm

```bash
npm i
npm run dev
```

App will be available at [http://localhost:3333](http://localhost:3333).

### Using Docker

```bash
docker build -t saml-mock .
docker run -p 3333:3333 saml-mock
```

App will be available at [http://localhost:3333](http://localhost:3333).

## Inspirations and reference

- https://github.com/AmaanC/saml-idp
- https://github.com/auth0/node-saml
- https://github.com/auth0/node-samlp
- https://github.com/auth0/passport-wsfed-saml2
