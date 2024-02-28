import { Router } from "express";

const router = Router();

// Tweet CRUD

// Create tweet
router.post("/", async (req, res) => {
  res.status(501).json({ error: "Not Imlemented Tweets" });
});

// list tweet
router.get("/", (req, res) => {
  res.status(501).json({ error: "Not Imlemented Tweets" });
});

// get one tweet
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.status(501).json({ error: `Not Implmented ${id}` });
});

// update tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not Implmented ${id}` });
});

// delete tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not Implmented ${id}` });
});

export default router;
