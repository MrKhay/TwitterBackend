import jwt from "jsonwebtoken";
import { env } from "process";

const JWT_SECRET = env.JWT_SECRET ?? "MY SECRET";

export function generateEmailToken(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}
