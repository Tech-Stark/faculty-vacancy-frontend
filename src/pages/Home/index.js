import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  if (isLoggedIn && !isAdmin) {
    return <Navigate to="/vacancy" replace />;
  } else if (isLoggedIn && isAdmin) {
    return <Navigate to="/admin/vacancy" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Home;
