const url = require("node:url");
const http = require("node:http");
const crypto = require("node:crypto");
const { Buffer } = require("node:buffer");

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

function verifyToken(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Invalid JWT format: Token must have 3 parts.");
    return null;
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload));
  } catch (error) {
    console.error("Failed to decode JWT header or payload:", error.message);
    return null;
  }

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signatureInput);
  const expectedSignature = base64UrlEncode(hmac.digest("base64"));

  if (expectedSignature !== encodedSignature) {
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

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const method = request.method;
  response.setHeader("Content-Type", "application/json");

  if (pathname === "/login" && method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      let credentials;
      try {
        credentials = JSON.parse(body);
      } catch (error) {
        response.writeHead(400);
        response.end(JSON.stringify({ message: "Invalid JSON body." }));
        return;
      }

      const { username, password } = credentials;

      if (username === "user" && password === "pass") {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = currentTime + TOKEN_EXPIRATION_SECONDS;

        const payload = {
          userId: 123,
          username: username,
          role: "admin",
          iat: currentTime, // Issued At
          exp: expirationTime, // Expiration Time
        };

        const token = createToken(payload, SECRET_KEY);

        response.writeHead(200);
        response.end(
          JSON.stringify({ message: "Login successful!", token: token })
        );
      } else {
        response.writeHead(401);
        response.end(JSON.stringify({ message: "Invalid credentials." }));
      }
    });
  } else if (pathname === "/protected" && method === "GET") {
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      response.writeHead(401);
      response.end(
        JSON.stringify({ message: "Authorization header missing." })
      );
      return;
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      response.writeHead(401);
      response.end(
        JSON.stringify({
          message:
            'Invalid Authorization header format. Expected "Bearer <token>".',
        })
      );
      return;
    }

    const token = tokenParts[1];
    const decodedPayload = verifyToken(token, SECRET_KEY);

    if (decodedPayload) {
      response.writeHead(200);
      response.end(
        JSON.stringify({
          message: "Access granted to protected resource!",
          userData: decodedPayload,
        })
      );
    } else {
      response.writeHead(403); // Forbidden
      response.end(
        JSON.stringify({ message: "Access denied: Invalid or expired token." })
      );
    }
  } else {
    response.writeHead(404);
    response.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Endpoints:");
  console.log(
    `  POST /login - Send { "username": "user", "password": "pass" } to get a JWT.`
  );
  console.log(
    `  GET /protected - Send JWT in "Authorization: Bearer <token>" header to access.`
  );
});
