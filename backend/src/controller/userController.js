import driver from "../config/database.js";

import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_SKILLS,
  GET_USER_PROJECTS
} from "../queries/users.js";

export const getAllUsers = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_USERS);

    const users = result.records.map((record) => ({
      userId: record.get("userId"),
      name: record.get("name"),
      email: record.get("email"),
      skills: record.get("skills").filter(
        (skill) => skill.id !== null
      )
    }));

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  } finally {
    await session.close();
  }
};

export const getUserById = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      GET_USER_BY_ID,
      { userId }
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const record = result.records[0];

    const user = {
      userId: record.get("userId"),
      name: record.get("name"),
      email: record.get("email"),

      skills: record.get("skills").filter(
        (skill) => skill.id !== null
      ),

      projects: record.get("projects").filter(
        (project) => project.id !== null
      ),

      companies: record.get("companies").filter(
        (company) => company.id !== null
      )
    };

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  } finally {
    await session.close();
  }
};

export const getUserSkills = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      GET_USER_SKILLS,
      { userId }
    );

    const skills = result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name")
    }));

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    console.error("Get user skills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user skills"
    });
  } finally {
    await session.close();
  }
};

export const getUserProjects = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      GET_USER_PROJECTS,
      { userId }
    );

    const projects = result.records.map((record) => ({
      projectId: record.get("projectId"),
      project: record.get("project"),
      companyId: record.get("companyId"),
      company: record.get("company")
    }));

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get user projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user projects"
    });
  } finally {
    await session.close();
  }
};