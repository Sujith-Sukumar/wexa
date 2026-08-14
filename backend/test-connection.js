import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

console.log("URI:", process.env.COGNODB_URI);
console.log("USERNAME:", process.env.COGNODB_USERNAME);
console.log("PASSWORD EXISTS:", !!process.env.COGNODB_PASSWORD);

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  ),
  {
    connectionTimeout: 30000,
    maxConnectionPoolSize: 10
  }
);

try {
  console.log("\nTesting connectivity...");

  await driver.verifyConnectivity();

  console.log("✅ CognoDB connection successful!");

  const session = driver.session();

  try {
    const result = await session.run(`
      RETURN 1 AS test
    `);

    console.log(
      "Query result:",
      result.records[0].get("test").toNumber()
    );
  } finally {
    await session.close();
  }

} catch (error) {
  console.log("\n❌ Connection failed");
  console.log("Code:", error.code);
  console.log("Message:", error.message);
  console.log("Cause:", error.cause);
  console.log("\nFull error:");
  console.error(error);

} finally {
  await driver.close();
}