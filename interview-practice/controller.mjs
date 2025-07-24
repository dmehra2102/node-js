import { createToken, verifyToken } from "./token.mjs";

const TOKEN_EXPIRATION_SECONDS = 3600;
const SECRET_KEY = "0ba8ec9e-22d0-4783-8d69-13dabd5020fd";

const loginController = (request, response) => {
  let body = "";
  request.on("data", (data) => {
    body += data.toString();
  });

  request.on("end", () => {
    const { email, password } = JSON.parse(body);
    if (email !== "admin" && password !== "admin") {
      response.writeHead(401);
      response.end(JSON.stringify({ message: "Invalid credentials." }));
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + TOKEN_EXPIRATION_SECONDS;

    const payload = {
      userName: "admin",
      iat: currentTime,
      exp: expirationTime,
    };

    const token = createToken(payload, SECRET_KEY);

    response.writeHead(201);
    response.end(
      JSON.stringify({ message: "Login successful!", token: token })
    );
  });
};

const userController = (request, response) => {
  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    response.writeHead(401);
    response.end(JSON.stringify({ message: "Authorization header missing." }));
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
  const payload = verifyToken(token, SECRET_KEY);

  if (!payload) {
    response.writeHead(403);
    response.end(
      JSON.stringify({ message: "Access denied: Invalid or expired token." })
    );
    return;
  }

  response.writeHead(200);
  response.end(
    JSON.stringify({
      message: "Access granted to protected resource!",
      userData: payload,
    })
  );
  return;
};

export { loginController, userController };
