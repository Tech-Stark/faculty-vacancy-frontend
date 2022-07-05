import { useState } from "react";
import LoginForm from "../../components/loginForm";
import SignupForm from "../../components/signupForm";

const Login = () => {
  const [type, setType] = useState("Login");
  const handleToggleSignup = (e) => {
    setType("Sign Up");
  };
  const handleToggleLogin = (e) => {
    setType("Login");
  };
  return (
    <div className="Login">
      <div className="btn-container">
        <button onClick={handleToggleLogin}>Login</button>
        <button onClick={handleToggleSignup}>Sign up</button>
      </div>
      <h1>{type}</h1>
      {type === "Login" && <LoginForm />}
      {type === "Sign Up" && <SignupForm />}
    </div>
  );
};

export default Login;
