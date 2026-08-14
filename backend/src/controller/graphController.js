import driver from "../config/database.js";

import {
  GET_MULTI_HOP_CONNECTIONS
} from "../queries/graph.js";

export const getUserGraph = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      `
      MATCH (u:User {id: $userId})

      OPTIONAL MATCH (u)-[r1:HAS_SKILL]->(s:Skill)
      OPTIONAL MATCH (u)-[r2:WORKED_ON]->(p:Project)
      OPTIONAL MATCH (u)-[r3:WORKED_AT]->(c:Company)

      RETURN
        u,
        collect(DISTINCT s) AS skills,
        collect(DISTINCT p) AS projects,
        collect(DISTINCT c) AS companies
      `,
      { userId }
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const record = result.records[0];

    const user = record.get("u");
    const skills = record.get("skills");
    const projects = record.get("projects");
    const companies = record.get("companies");

    const nodes = [];
    const edges = [];

    const addNode = (node, label, type) => {
      if (!node) return;

      const id = node.properties.id;

      if (nodes.some((item) => item.id === id)) {
        return;
      }

      nodes.push({
        id,
        label,
        type,
        properties: node.properties
      });
    };

    addNode(
      user,
      user.properties.name,
      "user"
    );

    skills
      .filter(Boolean)
      .forEach((skill) => {
        addNode(
          skill,
          skill.properties.name,
          "skill"
        );

        edges.push({
          id: `${user.properties.id}-${skill.properties.id}`,
          source: user.properties.id,
          target: skill.properties.id,
          label: "HAS_SKILL"
        });
      });

    projects
      .filter(Boolean)
      .forEach((project) => {
        addNode(
          project,
          project.properties.name,
          "project"
        );

        edges.push({
          id: `${user.properties.id}-${project.properties.id}`,
          source: user.properties.id,
          target: project.properties.id,
          label: "WORKED_ON"
        });
      });

    companies
      .filter(Boolean)
      .forEach((company) => {
        addNode(
          company,
          company.properties.name,
          "company"
        );

        edges.push({
          id: `${user.properties.id}-${company.properties.id}`,
          source: user.properties.id,
          target: company.properties.id,
          label: "WORKED_AT"
        });
      });

    res.status(200).json({
      success: true,
      data: {
        nodes,
        edges
      }
    });
  } catch (error) {
    console.error("Graph error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to build graph"
    });
  } finally {
    await session.close();
  }
};

export const getMultiHopConnections = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      GET_MULTI_HOP_CONNECTIONS,
      { userId }
    );

    const connections = result.records.map((record) => ({
      user: record.get("user"),
      project: record.get("project"),
      company: record.get("company"),
      job: record.get("job"),
      location: record.get("location")
    }));

    res.status(200).json({
      success: true,
      count: connections.length,
      data: connections
    });
  } catch (error) {
    console.error("Multi-hop error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch graph connections"
    });
  } finally {
    await session.close();
  }
};