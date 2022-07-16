import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
//import Typography from '@mui/material/Typography';
import "./App.css";
import ToastList from './components/ToastList';
import { loadUser } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ToastList />
      <Outlet />
      {/* <Typography variant="body2" color="text.secondary" style={{ width: "100%", position: 'fixed', bottom: 0, paddingBottom: 12, textAlign: 'center' }}>
        {'Copyright © | Tech Stark | '}{' '}{new Date().getFullYear()}{'.'}
      </Typography> */}
    </div>
  );
}

export default App;
