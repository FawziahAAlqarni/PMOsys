export interface MicrosoftTokenPayload {
  oid: string; // Object ID (unique user identifier)
  tid: string; // Tenant ID
  email?: string;
  upn?: string; // User Principal Name
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  roles?: string[];
  aud: string; // Audience (should match client ID)
  iss: string; // Issuer
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
  [key: string]: any; // Allow additional claims
}
