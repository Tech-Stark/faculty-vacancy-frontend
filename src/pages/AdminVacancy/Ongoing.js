import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import { BASE_URL, configToken } from "../../utils/api";
import { addToast } from "../../redux/features/toast/toastSlice";
import OngoingVacancyCard from "../../components/OngoingVacancyCard";

const Ongoing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ongoingData, setOngoingData] = useState([]);
  const dispatch = useDispatch();
  const { token, isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      setIsLoading(true);
      axios
        .get(`${BASE_URL}admin/getongoingvacancies`, configToken(token))
        .then((response) => {
          console.log(response.data);
          setOngoingData(response.data);
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
        {ongoingData.map((item, index) => (
          <Grid key={index} item xs={12}>
            <OngoingVacancyCard item={item} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default Ongoing;
