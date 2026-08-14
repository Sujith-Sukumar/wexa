import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidate from "./pages/Candidate";
import GraphExplorer from "./pages/GraphExplorer";

const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <main>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/candidate"
            element={<Candidate />}
          />

          <Route
            path="/graph"
            element={<GraphExplorer />}
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
};

export default App;