import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "COGNODB_URI",
  "COGNODB_USERNAME",
  "COGNODB_PASSWORD"
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

export const verifyDatabaseConnection = async () => {
  const session = driver.session();

  try {
    await session.run("RETURN 1 AS connected");

    console.log("✅ CognoDB connected");
  } catch (error) {
    console.error("❌ CognoDB connection failed");
    console.error(error.message);

    throw error;
  } finally {
    await session.close();
  }
};

export default driver;