import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";

const JobCard = ({ job, showMatch = true }) => {
  const matchingSkills =
    job.matchingSkills || job.skills || [];

  const matchCount =
    job.matchCount || matchingSkills.length;

  const totalSkills =
    job.skills?.length || matchingSkills.length;

  const percentage =
    showMatch && totalSkills > 0
      ? Math.min(
          100,
          Math.round(
            (matchCount / totalSkills) * 100
          )
        )
      : null;

  return (
    <div className="job-card">

      <div className="job-card-top">

        <div className="company-logo">
          {(job.company || "C")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="job-main">

          <h3>{job.title}</h3>

          <p className="company-name">
            {job.company || "Company"}
          </p>

          <p className="job-location">
            📍 {job.location || "Remote"}
          </p>

        </div>

        {percentage !== null && (
          <div className="match-score">
            <strong>{percentage}%</strong>
            <span>match</span>
          </div>
        )}

      </div>

      <div className="job-skills">

        {matchingSkills
          .slice(0, 5)
          .map((skill, index) => {

            const skillName =
              typeof skill === "string"
                ? skill
                : skill.name;

            return (
              <SkillBadge key={index}>
                {skillName}
              </SkillBadge>
            );
          })}

      </div>

      {showMatch && matchCount > 0 && (
        <p className="matching-text">
          ✓ {matchCount} matching{" "}
          {matchCount === 1 ? "skill" : "skills"}
        </p>
      )}

      <div className="job-card-footer">

        <span className="job-type">
          Full-time
        </span>

        {job.jobId && (
          <Link
            to={`/jobs/${job.jobId}`}
            className="view-job"
          >
            View details →
          </Link>
        )}

      </div>

    </div>
  );
};

export default JobCard;