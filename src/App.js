import Check from "./components/Check";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>
      <Outlet />
      <Check></Check>
    </div>
  );
}

export default App;
