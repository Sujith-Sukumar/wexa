import express from "express";

import {
  getUserGraph,
  getMultiHopConnections
} from "../controller/graphController.js";

const router = express.Router();

router.get(
  "/user/:userId",
  getUserGraph
);

router.get(
  "/multi-hop/:userId",
  getMultiHopConnections
);

export default router;