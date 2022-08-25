import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { BASE_URL, configToken } from "../../utils/api";
import { addToast } from "../../redux/features/toast/toastSlice";
import PendingVacancyCard from "../../components/PendingVacancyCard";

const Pending = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const dispatch = useDispatch();
  const { token, isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      setIsLoading(true);
      axios
        .get(`${BASE_URL}admin/getpendingvacancies`, configToken(token))
        .then((response) => {
          console.log(response.data);
          setPendingData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          dispatch(
            addToast({
              type: "error",
              message: "Could not load vacancies!",
            })
          );
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, token, isAdmin]);

  if (isLoading) {
    return (
      <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 5 }}>
        <CircularProgress color="primary" size={40} />
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 5 }}>
        {pendingData.map((item, index) => (
          <Grid key={index} item xs={12}>
            <PendingVacancyCard item={item} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default Pending;