const url = require("node:url");
const http = requrie("node:http");
const crypto = require("node:crypto");
const { Buffer } = require("node:buffer");
const queryString = require("node:querystring");

// --- CONFIGURATION ---
const TOKEN_EXPIRATION_SECONDS = 3600; // Token valid for 1 hour
const SECRET_KEY = "0ba8ec9e-22d0-4783-8d69-13dabd5020fd";

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(b64url) {
  // Add padding back if necessary for standard Base64 decoding
  let padding = "";
  const remainder = b64url.length % 4;
  if (remainder === 2) {
    padding = "==";
  } else if (remainder === 3) {
    padding = "=";
  }
  return Buffer.from(
    b64url.replace(/-/g, "+").replace(/_/g, "/") + padding,
    "base64"
  ).toString("utf8");
}

function createToken(payload, secret) {
  const header = {
    type: "JWT",
    alg: "HS256",
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signatureInput);
  const signature = hmac.digest("base64");

  const encodedSignature = base64UrlEncode(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}
