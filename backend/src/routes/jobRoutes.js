import express from "express";

import {
  getAllJobs,
  getJobById,
  getRecommendedJobs,
  getSkillGaps
} from "../controller/jobController.js";

const router = express.Router();

router.get("/", getAllJobs);

router.get(
  "/recommended/:userId",
  getRecommendedJobs
);

router.get(
  "/skill-gaps/:userId",
  getSkillGaps
);

router.get(
  "/:jobId",
  getJobById
);

export default router;