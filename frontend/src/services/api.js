import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000
});

// ------------------------------------
// Users
// ------------------------------------

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const getUserSkills = async (userId) => {
  const response = await api.get(
    `/users/${userId}/skills`
  );

  return response.data;
};

export const getUserProjects = async (userId) => {
  const response = await api.get(
    `/users/${userId}/projects`
  );

  return response.data;
};

// ------------------------------------
// Jobs
// ------------------------------------

export const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

export const getJob = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

export const getRecommendedJobs = async (userId) => {
  const response = await api.get(
    `/jobs/recommended/${userId}`
  );

  return response.data;
};

export const getSkillGaps = async (userId) => {
  const response = await api.get(
    `/jobs/skill-gaps/${userId}`
  );

  return response.data;
};

// ------------------------------------
// Graph
// ------------------------------------

export const getUserGraph = async (userId) => {
  const response = await api.get(
    `/graph/user/${userId}`
  );

  return response.data;
};

export const getMultiHopConnections = async (userId) => {
  const response = await api.get(
    `/graph/multi-hop/${userId}`
  );

  return response.data;
};

// ------------------------------------
// Health
// ------------------------------------

export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;