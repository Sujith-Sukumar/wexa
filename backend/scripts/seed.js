import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.COGNODB_URI ||
  !process.env.COGNODB_USERNAME ||
  !process.env.COGNODB_PASSWORD
) {
  console.error(
    "❌ Missing CognoDB environment variables"
  );

  process.exit(1);
}

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

const seedDatabase = async () => {
  const session = driver.session();

  try {
    console.log("=================================");
    console.log("SkillGraph Database Seed");
    console.log("=================================");

    // ---------------------------------------
    // 1. Clear existing database
    // ---------------------------------------

    console.log("🗑️ Clearing database...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // ---------------------------------------
    // 2. Create Users
    // ---------------------------------------

    console.log("👤 Creating users...");

    await session.run(`
      CREATE
        (:User {
          id: "user-001",
          name: "Sujith",
          email: "sujith@example.com"
        }),

        (:User {
          id: "user-002",
          name: "Alex",
          email: "alex@example.com"
        }),

        (:User {
          id: "user-003",
          name: "Sarah",
          email: "sarah@example.com"
        }),

        (:User {
          id: "user-004",
          name: "David",
          email: "david@example.com"
        }),

        (:User {
          id: "user-005",
          name: "Priya",
          email: "priya@example.com"
        })
    `);

    // ---------------------------------------
    // 3. Create Skills
    // ---------------------------------------

    console.log("🛠️ Creating skills...");

    await session.run(`
      CREATE
        (:Skill {
          id: "skill-001",
          name: "React"
        }),

        (:Skill {
          id: "skill-002",
          name: "Node.js"
        }),

        (:Skill {
          id: "skill-003",
          name: "MongoDB"
        }),

        (:Skill {
          id: "skill-004",
          name: "TypeScript"
        }),

        (:Skill {
          id: "skill-005",
          name: "Python"
        }),

        (:Skill {
          id: "skill-006",
          name: "AWS"
        }),

        (:Skill {
          id: "skill-007",
          name: "Docker"
        }),

        (:Skill {
          id: "skill-008",
          name: "PostgreSQL"
        }),

        (:Skill {
          id: "skill-009",
          name: "Redis"
        }),

        (:Skill {
          id: "skill-010",
          name: "GraphQL"
        })
    `);

    // ---------------------------------------
    // 4. Create Companies
    // ---------------------------------------

    console.log("🏢 Creating companies...");

    await session.run(`
      CREATE
        (:Company {
          id: "company-001",
          name: "TechNova"
        }),

        (:Company {
          id: "company-002",
          name: "CloudWorks"
        }),

        (:Company {
          id: "company-003",
          name: "DataSphere"
        }),

        (:Company {
          id: "company-004",
          name: "InnovateLabs"
        })
    `);

    // ---------------------------------------
    // 5. Create Projects
    // ---------------------------------------

    console.log("📁 Creating projects...");

    await session.run(`
      CREATE
        (:Project {
          id: "project-001",
          name: "CRM Platform"
        }),

        (:Project {
          id: "project-002",
          name: "E-Commerce Platform"
        }),

        (:Project {
          id: "project-003",
          name: "Analytics Dashboard"
        }),

        (:Project {
          id: "project-004",
          name: "Payment Gateway"
        }),

        (:Project {
          id: "project-005",
          name: "Cloud Migration"
        })
    `);

    // ---------------------------------------
    // 6. Create Jobs
    // ---------------------------------------

    console.log("💼 Creating jobs...");

    await session.run(`
      CREATE
        (:Job {
          id: "job-001",
          title: "Full Stack Developer",
          location: "Remote"
        }),

        (:Job {
          id: "job-002",
          title: "React Developer",
          location: "Bangalore"
        }),

        (:Job {
          id: "job-003",
          title: "Backend Developer",
          location: "Hyderabad"
        }),

        (:Job {
          id: "job-004",
          title: "Cloud Engineer",
          location: "Pune"
        }),

        (:Job {
          id: "job-005",
          title: "TypeScript Developer",
          location: "Remote"
        }),

        (:Job {
          id: "job-006",
          title: "Python Developer",
          location: "Bangalore"
        }),

        (:Job {
          id: "job-007",
          title: "DevOps Engineer",
          location: "Chennai"
        })
    `);

    // ---------------------------------------
    // 7. Create Relationships
    // ---------------------------------------

    console.log("🔗 Creating relationships...");

    await session.run(`
      MATCH
        (sujith:User {id: "user-001"}),
        (alex:User {id: "user-002"}),
        (sarah:User {id: "user-003"}),
        (david:User {id: "user-004"}),
        (priya:User {id: "user-005"}),

        (react:Skill {id: "skill-001"}),
        (node:Skill {id: "skill-002"}),
        (mongo:Skill {id: "skill-003"}),
        (typescript:Skill {id: "skill-004"}),
        (python:Skill {id: "skill-005"}),
        (aws:Skill {id: "skill-006"}),
        (docker:Skill {id: "skill-007"}),
        (postgres:Skill {id: "skill-008"}),
        (redis:Skill {id: "skill-009"}),
        (graphql:Skill {id: "skill-010"}),

        (techNova:Company {id: "company-001"}),
        (cloudWorks:Company {id: "company-002"}),
        (dataSphere:Company {id: "company-003"}),
        (innovateLabs:Company {id: "company-004"}),

        (crm:Project {id: "project-001"}),
        (ecommerce:Project {id: "project-002"}),
        (analytics:Project {id: "project-003"}),
        (payment:Project {id: "project-004"}),
        (cloudMigration:Project {id: "project-005"}),

        (fullstack:Job {id: "job-001"}),
        (reactJob:Job {id: "job-002"}),
        (backend:Job {id: "job-003"}),
        (cloudJob:Job {id: "job-004"}),
        (typescriptJob:Job {id: "job-005"}),
        (pythonJob:Job {id: "job-006"}),
        (devopsJob:Job {id: "job-007"})

      CREATE

        // -------------------------
        // User → Skills
        // -------------------------

        (sujith)-[:HAS_SKILL]->(react),
        (sujith)-[:HAS_SKILL]->(node),
        (sujith)-[:HAS_SKILL]->(mongo),

        (alex)-[:HAS_SKILL]->(react),
        (alex)-[:HAS_SKILL]->(typescript),

        (sarah)-[:HAS_SKILL]->(python),
        (sarah)-[:HAS_SKILL]->(aws),

        (david)-[:HAS_SKILL]->(node),
        (david)-[:HAS_SKILL]->(docker),

        (priya)-[:HAS_SKILL]->(typescript),
        (priya)-[:HAS_SKILL]->(graphql),

        // -------------------------
        // User → Projects
        // -------------------------

        (sujith)-[:WORKED_ON]->(crm),
        (sujith)-[:WORKED_ON]->(ecommerce),

        (alex)-[:WORKED_ON]->(ecommerce),
        (alex)-[:WORKED_ON]->(payment),

        (sarah)-[:WORKED_ON]->(analytics),

        (david)-[:WORKED_ON]->(cloudMigration),

        (priya)-[:WORKED_ON]->(analytics),

        // -------------------------
        // User → Companies
        // -------------------------

        (sujith)-[:WORKED_AT]->(techNova),

        (alex)-[:WORKED_AT]->(cloudWorks),

        (sarah)-[:WORKED_AT]->(dataSphere),

        (david)-[:WORKED_AT]->(cloudWorks),

        (priya)-[:WORKED_AT]->(innovateLabs),

        // -------------------------
        // Project → Company
        // -------------------------

        (crm)-[:BUILT_AT]->(techNova),

        (ecommerce)-[:BUILT_AT]->(cloudWorks),

        (analytics)-[:BUILT_AT]->(dataSphere),

        (payment)-[:BUILT_AT]->(innovateLabs),

        (cloudMigration)-[:BUILT_AT]->(cloudWorks),

        // -------------------------
        // Company → Jobs
        // -------------------------

        (techNova)-[:POSTED]->(fullstack),
        (techNova)-[:POSTED]->(reactJob),

        (cloudWorks)-[:POSTED]->(backend),
        (cloudWorks)-[:POSTED]->(cloudJob),

        (dataSphere)-[:POSTED]->(pythonJob),

        (innovateLabs)-[:POSTED]->(typescriptJob),
        (innovateLabs)-[:POSTED]->(devopsJob),

        // -------------------------
        // Jobs → Required Skills
        // -------------------------

        (fullstack)-[:REQUIRES_SKILL]->(react),
        (fullstack)-[:REQUIRES_SKILL]->(node),
        (fullstack)-[:REQUIRES_SKILL]->(mongo),
        (fullstack)-[:REQUIRES_SKILL]->(typescript),

        (reactJob)-[:REQUIRES_SKILL]->(react),
        (reactJob)-[:REQUIRES_SKILL]->(typescript),

        (backend)-[:REQUIRES_SKILL]->(node),
        (backend)-[:REQUIRES_SKILL]->(mongo),
        (backend)-[:REQUIRES_SKILL]->(redis),

        (cloudJob)-[:REQUIRES_SKILL]->(aws),
        (cloudJob)-[:REQUIRES_SKILL]->(docker),

        (typescriptJob)-[:REQUIRES_SKILL]->(typescript),
        (typescriptJob)-[:REQUIRES_SKILL]->(react),

        (pythonJob)-[:REQUIRES_SKILL]->(python),
        (pythonJob)-[:REQUIRES_SKILL]->(postgres),

        (devopsJob)-[:REQUIRES_SKILL]->(docker),
        (devopsJob)-[:REQUIRES_SKILL]->(aws),
        (devopsJob)-[:REQUIRES_SKILL]->(redis)
    `);

    // ---------------------------------------
    // 8. Verify database
    // ---------------------------------------

    console.log("🔍 Verifying database...");

    const result = await session.run(`
      MATCH (n)
      RETURN count(n) AS totalNodes
    `);

    const totalNodes =
      result.records[0]
        .get("totalNodes")
        .toNumber();

    console.log(
      `✅ Total nodes created: ${totalNodes}`
    );

    console.log("");
    console.log("=================================");
    console.log("✅ Database seed completed");
    console.log("=================================");
  } catch (error) {
    console.error("");
    console.error("❌ Seed failed");
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();