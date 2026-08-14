import express from "express";

import {
  getAllUsers,
  getUserById,
  getUserSkills,
  getUserProjects
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get(
  "/:userId/skills",
  getUserSkills
);

router.get(
  "/:userId/projects",
  getUserProjects
);

router.get(
  "/:userId",
  getUserById
);

export default router;