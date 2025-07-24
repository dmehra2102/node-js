import crypto from "node:crypto";
import { Buffer } from "node:buffer";

function base64UrlEncode(strInput) {
  return Buffer.from(strInput).toString("base64url");
}

function base64urlDecode(strInput) {
  return Buffer.from(strInput, "base64url").toString("utf8");
}

function createToken(payload, secret) {
  const tokenHeader = {
    type: "JWT",
    alg: "HS256",
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const encodedTokenHeader = base64UrlEncode(JSON.stringify(tokenHeader));

  const signatureInput = `${encodedTokenHeader}.${encodedPayload}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signatureInput);
  const encodedSignature = hmac.digest("base64url");

  return `${encodedTokenHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyToken(token, secret) {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    console.error("Invalid JWT format: Token must have 3 parts.");
    return null;
  }
  const [encodedTokenHeader, encodedPayload, encodedSignature] = tokenParts;

  const payload = JSON.parse(base64urlDecode(encodedPayload));

  const signatureInput = `${encodedTokenHeader}.${encodedPayload}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signatureInput);
  const expectedSignature = hmac.digest("base64url");

  if (encodedSignature !== expectedSignature) {
    console.error("JWT signature mismatch: Token is invalid or tampered.");
    return null;
  }
  if (payload.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > payload.exp) {
      console.error("JWT expired: Token is no longer valid.");
      return null;
    }
  }

  return payload;
}

export { createToken, verifyToken };
