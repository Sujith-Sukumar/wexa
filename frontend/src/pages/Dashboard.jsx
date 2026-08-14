import {
  useEffect,
  useState
} from "react";

import {
  getRecommendedJobs,
  getUser,
  getSkillGaps
} from "../services/api";

import JobCard from "../components/JobCard";
import SkillBadge from "../components/SkillBadge";

const USER_ID = "user-001";

const Dashboard = () => {

  const [user, setUser] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [skillGaps, setSkillGaps] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true);
        setError("");

        const [
          userResponse,
          jobsResponse,
          gapsResponse
        ] = await Promise.all([
          getUser(USER_ID),
          getRecommendedJobs(USER_ID),
          getSkillGaps(USER_ID)
        ]);

        setUser(userResponse.data);

        setJobs(jobsResponse.data || []);

        setSkillGaps(
          gapsResponse.data || []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load dashboard. Make sure the backend and CognoDB are running."
        );

      } finally {

        setLoading(false);

      }
    };

    loadDashboard();

  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          Loading your dashboard...
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

      {/* Hero */}

      <section className="dashboard-hero">

        <div>
          <p className="eyebrow">
            GRAPH-POWERED CAREER DISCOVERY
          </p>

          <h1>
            Welcome back,{" "}
            {user?.name || "Candidate"} 👋
          </h1>

          <p>
            Discover jobs based on the
            relationships between your skills,
            projects and experience.
          </p>
        </div>

      </section>

      {/* Stats */}

      <section className="stats-grid">

        <div className="stat-card">
          <span>Skills</span>
          <strong>
            {user?.skills?.length || 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>Projects</span>
          <strong>
            {user?.projects?.length || 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>Companies</span>
          <strong>
            {user?.companies?.length || 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>Job Matches</span>
          <strong>
            {jobs.length}
          </strong>
        </div>

      </section>

      {/* Skills */}

      <section className="content-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              YOUR PROFILE
            </p>

            <h2>Your Skills</h2>
          </div>

        </div>

        <div className="skills-panel">

          {user?.skills?.length ? (
            user.skills.map((skill) => (
              <SkillBadge
                key={skill.id}
              >
                {skill.name}
              </SkillBadge>
            ))
          ) : (
            <p>No skills available.</p>
          )}

        </div>

      </section>

      {/* Recommended jobs */}

      <section className="content-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              GRAPH MATCHING
            </p>

            <h2>
              Recommended Jobs
            </h2>
          </div>

          <a href="/jobs">
            View all →
          </a>

        </div>

        {jobs.length > 0 ? (

          <div className="job-grid">

            {jobs
              .slice(0, 4)
              .map((job) => (
                <JobCard
                  key={job.jobId}
                  job={job}
                />
              ))}

          </div>

        ) : (

          <div className="empty-box">
            No matching jobs found.
          </div>

        )}

      </section>

      {/* Skill gaps */}

      <section className="content-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              CAREER DEVELOPMENT
            </p>

            <h2>
              Skills Worth Learning
            </h2>
          </div>

        </div>

        {skillGaps.length > 0 ? (

          <div className="skill-gap-grid">

            {skillGaps
              .slice(0, 5)
              .map((skill) => (

                <div
                  className="skill-gap-card"
                  key={skill.skillId}
                >

                  <div>
                    <h3>
                      {skill.skill}
                    </h3>

                    <p>
                      Required by{" "}
                      {skill.jobCount} jobs
                    </p>
                  </div>

                  <span>↗</span>

                </div>

              ))}

          </div>

        ) : (

          <div className="empty-box">
            No skill gaps found.
          </div>

        )}

      </section>

    </div>
  );
};

export default Dashboard;