import { Outlet } from "react-router-dom";
import Typography from '@mui/material/Typography';
import "./App.css";
import ToastList from './components/ToastList';

function App() {
  return (
    <div className="App">
      <ToastList />
      <Outlet />
      <Typography variant="body2" color="text.secondary" style={{ width: "100%", position: 'absolute', bottom: 0, paddingBottom: 12, textAlign: 'center' }}>
        {'Copyright © | Tech Stark | '}{' '}{new Date().getFullYear()}{'.'}
      </Typography>
    </div>
  );
}

export default App;
