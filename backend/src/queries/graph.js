export const GET_MULTI_HOP_CONNECTIONS = `
  MATCH (u:User {id: $userId})-[:WORKED_ON]->(p:Project)

  OPTIONAL MATCH (p)-[:BUILT_AT]->(c:Company)

  OPTIONAL MATCH (c)<-[:POSTED]-(j:Job)

  RETURN
    u.name AS user,
    p.name AS project,
    c.name AS company,
    j.title AS job,
    j.location AS location

  ORDER BY project, company, job
`;