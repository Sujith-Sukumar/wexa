export const GET_ALL_JOBS = `
  MATCH (j:Job)
  OPTIONAL MATCH (c:Company)-[:POSTED]->(j)
  OPTIONAL MATCH (j)-[:REQUIRES_SKILL]->(s:Skill)

  RETURN
    j.id AS jobId,
    j.title AS title,
    j.location AS location,
    c.name AS company,
    collect(DISTINCT s.name) AS skills

  ORDER BY j.title
`;

export const GET_JOB_BY_ID = `
  MATCH (j:Job {id: $jobId})

  OPTIONAL MATCH (c:Company)-[:POSTED]->(j)

  OPTIONAL MATCH (j)-[:REQUIRES_SKILL]->(s:Skill)

  RETURN
    j.id AS jobId,
    j.title AS title,
    j.location AS location,
    c.id AS companyId,
    c.name AS company,
    collect(DISTINCT {
      id: s.id,
      name: s.name
    }) AS skills
`;

export const GET_RECOMMENDED_JOBS = `
  MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)

  MATCH (j:Job)-[:REQUIRES_SKILL]->(s)

  OPTIONAL MATCH (c:Company)-[:POSTED]->(j)

  WITH
    j,
    c,
    collect(DISTINCT s.name) AS matchingSkills

  RETURN
    j.id AS jobId,
    j.title AS title,
    j.location AS location,
    c.name AS company,
    matchingSkills,
    size(matchingSkills) AS matchCount

  ORDER BY matchCount DESC, title
  LIMIT 10
`;

export const GET_SKILL_GAPS = `
  MATCH (u:User {id: $userId})-[:HAS_SKILL]->(mySkill:Skill)

  MATCH (j:Job)-[:REQUIRES_SKILL]->(mySkill)

  MATCH (j)-[:REQUIRES_SKILL]->(recommended:Skill)

  WHERE NOT (u)-[:HAS_SKILL]->(recommended)

  WITH
    recommended,
    count(DISTINCT j) AS jobCount

  RETURN
    recommended.id AS skillId,
    recommended.name AS skill,
    jobCount

  ORDER BY jobCount DESC, skill
  LIMIT 10
`;