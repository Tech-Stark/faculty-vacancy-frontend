import { useSelector } from "react-redux";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <h1>Team Tech Stark</h1>
      <h3>Smart India Hackathon 2022</h3>
      <h6>Login Status : {isLoggedIn ? 'Logged in' : 'Not logged in'} </h6>
    </div>
  );
};

export default Home;
