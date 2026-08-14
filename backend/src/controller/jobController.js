import driver from "../config/database.js";

import {
  GET_ALL_JOBS,
  GET_JOB_BY_ID,
  GET_RECOMMENDED_JOBS,
  GET_SKILL_GAPS
} from "../queries/jobs.js";

const getValue = (record, key) => {
  const value = record.get(key);

  if (value && typeof value.toNumber === "function") {
    return value.toNumber();
  }

  return value;
};

export const getAllJobs = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(GET_ALL_JOBS);

    const jobs = result.records.map((record) => ({
      jobId: record.get("jobId"),
      title: record.get("title"),
      location: record.get("location"),
      company: record.get("company"),
      skills: record.get("skills")
    }));

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error("Get all jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  } finally {
    await session.close();
  }
};

export const getJobById = async (req, res) => {
  const session = driver.session();

  try {
    const { jobId } = req.params;

    const result = await session.run(
      GET_JOB_BY_ID,
      { jobId }
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const record = result.records[0];

    const job = {
      jobId: record.get("jobId"),
      title: record.get("title"),
      location: record.get("location"),
      companyId: record.get("companyId"),
      company: record.get("company"),
      skills: record.get("skills").filter(
        (skill) => skill.id !== null
      )
    };

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error("Get job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch job"
    });
  } finally {
    await session.close();
  }
};

export const getRecommendedJobs = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      GET_RECOMMENDED_JOBS,
      { userId }
    );

    const jobs = result.records.map((record) => ({
      jobId: record.get("jobId"),
      title: record.get("title"),
      location: record.get("location"),
      company: record.get("company"),
      matchingSkills: record.get("matchingSkills"),
      matchCount: getValue(record, "matchCount")
    }));

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error("Recommended jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate job recommendations"
    });
  } finally {
    await session.close();
  }
};

export const getSkillGaps = async (req, res) => {
  const session = driver.session();

  try {
    const { userId } = req.params;

    const result = await session.run(
      GET_SKILL_GAPS,
      { userId }
    );

    const skills = result.records.map((record) => ({
      skillId: record.get("skillId"),
      skill: record.get("skill"),
      jobCount: getValue(record, "jobCount")
    }));

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    console.error("Skill gap error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to calculate skill gaps"
    });
  } finally {
    await session.close();
  }
};