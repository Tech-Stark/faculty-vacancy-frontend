import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> |{" "}
        {!isLoggedIn && <Link to="/login">Login/Sign Up</Link>}
        {isLoggedIn && <a href="#">Logout</a>}
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
