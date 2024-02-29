import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

const JWT_SECRET = env.JWT_SECRET ?? "MY SECRET";
const prisma = new PrismaClient();

export type AuthRequest = Request & { user?: User };

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader?.split(" ")[1];

  if (!jwtToken) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = jwt.verify(jwtToken, JWT_SECRET) as { tokenId: number };

    if (!payload?.tokenId) {
      res.sendStatus(401);
      return;
    }
    const dbToken = await prisma.token.findUnique({
      where: { id: payload?.tokenId },
      include: { user: true },
    });

    // check if token was found
    if (!dbToken) {
      res.sendStatus(401);
      return;
    }
    // check if token is valid
    if (!dbToken?.valid) {
      res.status(401).json({ error: "API token is not valid" });
      return;
    }

    // check if token is expired
    if (dbToken?.expiration < new Date()) {
      res.status(401).json({ error: "API token is expired" });
      return;
    }

    req.user = dbToken.user;
  } catch (error) {
    res.sendStatus(401);
  }

  next();
}
