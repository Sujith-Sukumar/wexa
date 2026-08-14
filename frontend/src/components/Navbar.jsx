import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {
      label: "Dashboard",
      path: "/"
    },
    {
      label: "Jobs",
      path: "/jobs"
    },
    {
      label: "Candidate",
      path: "/candidate"
    },
    {
      label: "Graph Explorer",
      path: "/graph"
    }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <NavLink to="/" className="brand">
          <div className="brand-icon">
            SG
          </div>

          <div>
            <div className="brand-name">
              SkillGraph
            </div>

            <div className="brand-subtitle">
              Graph-powered career discovery
            </div>
          </div>
        </NavLink>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;