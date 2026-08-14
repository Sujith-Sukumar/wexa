import {
  useEffect,
  useState
} from "react";

import {
  getUserGraph,
  getMultiHopConnections
} from "../services/api";

import GraphView from "../components/GraphView";

const USER_ID = "user-001";

const GraphExplorer = () => {

  const [graph, setGraph] =
    useState({
      nodes: [],
      edges: []
    });

  const [connections, setConnections] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadGraph = async () => {

      try {

        setLoading(true);

        const [
          graphResponse,
          connectionResponse
        ] = await Promise.all([
          getUserGraph(USER_ID),
          getMultiHopConnections(USER_ID)
        ]);

        setGraph(
          graphResponse.data || {
            nodes: [],
            edges: []
          }
        );

        setConnections(
          connectionResponse.data || []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load graph data."
        );

      } finally {

        setLoading(false);

      }
    };

    loadGraph();

  }, []);

  return (
    <div className="page">

      <section className="page-header">

        <p className="eyebrow">
          COGNODB GRAPH
        </p>

        <h1>
          Graph Explorer
        </h1>

        <p>
          Explore how a candidate connects
          to skills, projects and companies.
        </p>

      </section>

      {loading && (
        <div className="loading">
          Loading graph...
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!loading && !error && (

        <>

          <section className="graph-card">

            <div className="graph-card-header">

              <div>
                <p className="section-label">
                  RELATIONSHIP MAP
                </p>

                <h2>
                  Sujith's Professional Graph
                </h2>
              </div>

              <div className="graph-legend">

                <span>
                  <i className="legend-dot user" />
                  User
                </span>

                <span>
                  <i className="legend-dot skill" />
                  Skill
                </span>

                <span>
                  <i className="legend-dot project" />
                  Project
                </span>

                <span>
                  <i className="legend-dot company" />
                  Company
                </span>

              </div>

            </div>

            <GraphView
              nodes={graph.nodes}
              edges={graph.edges}
            />

          </section>

          {/* Multi-hop */}

          <section className="content-section">

            <p className="section-label">
              MULTI-HOP TRAVERSAL
            </p>

            <h2>
              User → Project → Company → Job
            </h2>

            <p className="section-description">
              This traversal demonstrates how
              graph relationships can connect
              multiple entities without complex
              relational joins.
            </p>

            <div className="connection-list">

              {connections.length > 0 ? (

                connections.map(
                  (connection, index) => (

                    <div
                      className="connection-row"
                      key={index}
                    >

                      <div className="connection-node">
                        <strong>
                          {connection.user}
                        </strong>
                        <span>User</span>
                      </div>

                      <div className="connection-arrow">
                        →
                      </div>

                      <div className="connection-node">
                        <strong>
                          {connection.project}
                        </strong>
                        <span>Project</span>
                      </div>

                      <div className="connection-arrow">
                        →
                      </div>

                      <div className="connection-node">
                        <strong>
                          {connection.company}
                        </strong>
                        <span>Company</span>
                      </div>

                      <div className="connection-arrow">
                        →
                      </div>

                      <div className="connection-node">
                        <strong>
                          {connection.job}
                        </strong>
                        <span>Job</span>
                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="empty-box">
                  No multi-hop connections found.
                </div>

              )}

            </div>

          </section>

        </>

      )}

    </div>
  );
};

export default GraphExplorer;