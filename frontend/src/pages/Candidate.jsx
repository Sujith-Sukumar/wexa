import {
  useEffect,
  useState
} from "react";

import {
  getUser
} from "../services/api";

import SkillBadge from "../components/SkillBadge";

const USER_ID = "user-001";

const Candidate = () => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadUser = async () => {

      try {

        const response =
          await getUser(USER_ID);

        setUser(response.data);

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load candidate."
        );

      } finally {

        setLoading(false);

      }
    };

    loadUser();

  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          Loading candidate...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-box">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <section className="candidate-header">

        <div className="candidate-avatar">
          {user?.name?.charAt(0)}
        </div>

        <div>

          <p className="eyebrow">
            CANDIDATE PROFILE
          </p>

          <h1>
            {user?.name}
          </h1>

          <p>
            {user?.email}
          </p>

        </div>

      </section>

      {/* Skills */}

      <section className="content-section">

        <p className="section-label">
          EXPERTISE
        </p>

        <h2>
          Skills
        </h2>

        <div className="skills-panel">

          {user?.skills?.map((skill) => (
            <SkillBadge
              key={skill.id}
            >
              {skill.name}
            </SkillBadge>
          ))}

        </div>

      </section>

      {/* Projects */}

      <section className="content-section">

        <p className="section-label">
          EXPERIENCE
        </p>

        <h2>
          Projects
        </h2>

        <div className="project-grid">

          {user?.projects?.map(
            (project) => (

              <div
                className="project-card"
                key={project.id}
              >

                <div className="project-icon">
                  ◇
                </div>

                <h3>
                  {project.name}
                </h3>

                <p>
                  Project connected to
                  your professional graph.
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* Companies */}

      <section className="content-section">

        <p className="section-label">
          PROFESSIONAL NETWORK
        </p>

        <h2>
          Companies
        </h2>

        <div className="company-grid">

          {user?.companies?.map(
            (company) => (

              <div
                className="company-card"
                key={company.id}
              >

                <div className="company-logo">
                  {company.name.charAt(0)}
                </div>

                <div>
                  <h3>
                    {company.name}
                  </h3>

                  <p>
                    Professional connection
                  </p>
                </div>

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
};

export default Candidate;