import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, configToken } from "../../utils/api";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function CollegewiseData() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [numDays, setNumDays] = useState(1000);

  const { isLoggedIn, token, isSuperAdmin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      axios
        .get(
          `${BASE_URL}superadmin/getsuperadmindashboard/colleges/${numDays}`,
          configToken(token)
        )
        .then((response) => {
          //   console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
          setData([]);
        });
    }
  }, [isLoggedIn, token, isSuperAdmin, numDays]);

  console.log(data);

  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ my: 2 }}>
        <CircularProgress />
      </Grid>
    );
  }
  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          You are not Authorized!
        </Typography>
      </Box>
    );
  }
  if (data.length > 0) {
    return (
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>College Wise Data</h1>
          {/* {data.map((item, index) => (
            <div key={index}>
              <h1>{item.location}</h1>
              <h3>Current Vacancies : {item.vacancies[0].currentVacCount}</h3>
              <h3>Pending Vacancies : {item.vacancies[0].pendingVacCount}</h3>
            </div>
          ))} */}
          {/* <Grid container spacing={2} justifyContent="center" sx={{ my: 2 }}>
            {data.map((item, index) => (
              <Grid
                key={index}
                item
                component={Paper}
                xs={12}
                md={8}
                sx={{ mb: 4 }}
              >
                <Typography variant="h6" gutterBottom>
                  {item.collegeName}
                </Typography>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  sx={{ mt: 1 }}
                >
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" gutterBottom>
                      Current Vacancies
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {item.currentVacancies}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body1" gutterBottom>
                      Vacancies Created
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {item.createdVacancies}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      color={
                        item.pendingVacancies / item.createdVacancies >= 0.3
                          ? "red"
                          : ""
                      }
                    >
                      Pending Vacancies
                    </Typography>
                    <Typography
                      variant="h4"
                      gutterBottom
                      color={
                        item.pendingVacancies / item.createdVacancies >= 0.3
                          ? "red"
                          : ""
                      }
                    >
                      {item.pendingVacancies}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Button variant="contained" color="error" size="small">
                      Send Reminder
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid> */}
        </Box>
      </Container>
    );
  }
}

export default CollegewiseData;
