export const GET_ALL_USERS = `
  MATCH (u:User)

  OPTIONAL MATCH (u)-[:HAS_SKILL]->(s:Skill)

  RETURN
    u.id AS userId,
    u.name AS name,
    u.email AS email,
    collect(DISTINCT {
      id: s.id,
      name: s.name
    }) AS skills

  ORDER BY u.name
`;

export const GET_USER_BY_ID = `
  MATCH (u:User {id: $userId})

  OPTIONAL MATCH (u)-[:HAS_SKILL]->(s:Skill)

  OPTIONAL MATCH (u)-[:WORKED_ON]->(p:Project)

  OPTIONAL MATCH (u)-[:WORKED_AT]->(c:Company)

  RETURN
    u.id AS userId,
    u.name AS name,
    u.email AS email,

    collect(DISTINCT {
      id: s.id,
      name: s.name
    }) AS skills,

    collect(DISTINCT {
      id: p.id,
      name: p.name
    }) AS projects,

    collect(DISTINCT {
      id: c.id,
      name: c.name
    }) AS companies
`;

export const GET_USER_SKILLS = `
  MATCH (u:User {id: $userId})
        -[:HAS_SKILL]->
        (s:Skill)

  RETURN
    s.id AS id,
    s.name AS name

  ORDER BY s.name
`;

export const GET_USER_PROJECTS = `
  MATCH (u:User {id: $userId})
        -[:WORKED_ON]->
        (p:Project)

  OPTIONAL MATCH (p)-[:BUILT_AT]->(c:Company)

  RETURN
    p.id AS projectId,
    p.name AS project,
    c.id AS companyId,
    c.name AS company

  ORDER BY p.name
`;