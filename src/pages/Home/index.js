import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { signOut } from "../../redux/features/auth/authSlice";
import { addToast } from "../../redux/features/toast/toastSlice";

import Button from "@mui/material/Button";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleClick = () =>{
    if(isLoggedIn){
      dispatch(signOut());
      dispatch(addToast({type: 'info', message: 'You are logged out!'}));
    }
  }

  return (
    <div className="Home">
      <h1>Team Tech Stark</h1>
      <h3>Smart India Hackathon 2022</h3>
      <h6>Login Status : {isLoggedIn ? "Logged in" : "Not logged in"} </h6>
      {isLoggedIn ? <Button variant="contained" onClick={handleClick}>Logout</Button> 
        : <Link to="/login">Login</Link>}
    </div>
  );
};

export default Home;
