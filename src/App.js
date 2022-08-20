import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./App.css";
import ToastList from "./components/ToastList";
import TempNavbar from "./components/TempNavbar";

function App() {
  return (
    <div className="App">
      <TempNavbar />
      <ToastList />
      <Outlet />
      <Typography
        variant="body2"
        color="text.secondary"
        style={{ width: "100%", paddingBottom: 12, textAlign: "center" }}
      >
        {"Copyright © | Tech Stark | "} {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

//position: 'absolute', bottom: 0

export default App;
