import {
  useEffect,
  useState
} from "react";

import {
  getJobs
} from "../services/api";

import JobCard from "../components/JobCard";

const Jobs = () => {

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadJobs = async () => {

      try {

        const response =
          await getJobs();

        setJobs(response.data || []);

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load jobs."
        );

      } finally {

        setLoading(false);

      }
    };

    loadJobs();

  }, []);

  const filteredJobs =
    jobs.filter((job) => {

      const value =
        `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ") || ""}`
          .toLowerCase();

      return value.includes(
        search.toLowerCase()
      );

    });

  return (
    <div className="page">

      <section className="page-header">

        <p className="eyebrow">
          OPPORTUNITIES
        </p>

        <h1>
          Explore Jobs
        </h1>

        <p>
          Browse jobs connected to skills
          and companies in the graph.
        </p>

      </section>

      <div className="search-box">

        <span>⌕</span>

        <input
          type="text"
          placeholder="Search jobs, companies or skills..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {loading && (
        <div className="loading">
          Loading jobs...
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filteredJobs.length === 0 && (
          <div className="empty-box">
            No jobs found.
          </div>
        )}

      <div className="job-grid">

        {filteredJobs.map((job) => (
          <JobCard
            key={job.jobId}
            job={job}
            showMatch={false}
          />
        ))}

      </div>

    </div>
  );
};

export default Jobs;