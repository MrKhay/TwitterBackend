import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { env } from "process";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/authMiddlewear";

const router = Router();
const prisma = new PrismaClient();

// Tweet CRUD

// Create tweet
router.post("/", async (req: AuthRequest, res) => {
  const { content, image } = req.body;
  const user = req.user;

  if (!user) {
    res.sendStatus(401);
    return;
  }

  try {
    const responce = await prisma.tweet.create({
      data: {
        content,
        userId: user.id,
        image,
      },
    });

    res.json(responce);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
});

// list tweet
router.get("/", async (req, res) => {
  try {
    const responce = await prisma.tweet.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });
    res.json({ tweets: responce });
  } catch (error) {
    res.status(404).json({ error: "Something went wrong" });
  }
});

// get one tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const responce = await prisma.tweet.findUnique({
      where: { id: Number(id) },
    });

    if (!responce) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }
    res.json(responce);
  } catch (error) {
    res.status(401).json({ error: "Something went wrong" });
  }
});

// update tweet
router.put("/:id", async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { content, image } = req.body;
  const user = req.user;

  if (!user) {
    res.sendStatus(401);
    return;
  }

  try {
    const responce = await prisma.tweet.update({
      where: { id: Number(id) },
      data: {
        content,
        userId: user.id,
        image,
      },
    });
    res.json(responce);
  } catch (error) {
    res.status(501).json({ error: `Something went wrong` });
  }
});

// delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tweet.delete({ where: { id: Number(id) } });
    res.json("Success");
  } catch (error) {
    res.status(501).json({ error: `Something went wrong` });
  }
});

export default router;
