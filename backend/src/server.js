import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import driver, {
  verifyDatabaseConnection
} from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await verifyDatabaseConnection();

    const server = app.listen(PORT, () => {
      console.log(`
🚀 SkillGraph API running

Local:
http://localhost:${PORT}

Health:
http://localhost:${PORT}/api/health
      `);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);

      server.close(async () => {
        await driver.close();

        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error.message);

    await driver.close();

    process.exit(1);
  }
};

startServer();