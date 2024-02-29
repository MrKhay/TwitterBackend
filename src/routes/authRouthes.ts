import { Router } from "express";
import { generateEmailToken, generateAuthToken } from "../utility/utilities";
import { PrismaClient } from "@prisma/client";
import { env } from "process";

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = env.JWT_SECRET ?? "MY SECRET";

const prisma = new PrismaClient();
const router = Router();

// endpoints

// Create a user, if it doesn't exist
// generate the email token and send it the user email
router.post("/login", async (req, res) => {
  const { email } = req.body;

  // generate token
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email },
          },
        },
      },
    });

    console.log(createdToken);

    // send emailTOken to user email
    res.json({ tokenExpiration: expiration });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Couldn't start the authentication process" });
  }

  // generate token
});

// Validate the email Token
// Generate a long lived JWT token
router.post("/authenticate", async (req, res) => {
  const { email, emailToken } = req.body;

  const responce = await prisma.token.findUnique({
    where: { emailToken },
    include: {
      user: true,
    },
  });

  // check if token exists and its valid
  if (!responce || !responce.valid) {
    res.sendStatus(401);
    return;
  }

  // check if token is expired
  if (responce.expiration < new Date()) {
    res.status(401).json({ error: "Token Expired" });
    return;
  }

  // check if token sender is the owner of the token
  if (responce?.user?.email !== email) {
    res.sendStatus(401);
    return;
  }

  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );

  // generate an API token

  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: { email },
      },
    },
  });

  // invalidate email token
  await prisma.token.update({
    where: { id: responce.id },
    data: { valid: false },
  });

  // generate JWT token
  const authToken = generateAuthToken(apiToken.id);

  res.json({ authToken });
});
export default router;
