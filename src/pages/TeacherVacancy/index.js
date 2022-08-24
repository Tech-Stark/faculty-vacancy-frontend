import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/api";
import VacancyCard from "../../components/VacancyCard";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";

function TeacherVacancy() {
  //true->All vacancies; false->subscribed Vacancies
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const [vacancyToggle, setVacancyToggle] = useState(true);
  const [allVacancies, setAllVacancies] = useState([]);
  const [subsVacancies, setSubsVacancies] = useState([]);

  const handleAllVacancies = (arr) => setAllVacancies(arr);
  const handleSubsVacancies = (arr) => setSubsVacancies(arr);

  const arrtoCard = (resarr) =>
    resarr.map((vacancy) => (
      <Grid item xs={12} md={7} key={vacancy._id}>
        <VacancyCard
          position={vacancy.position}
          location={vacancy.location}
          college={vacancy.college}
          department={vacancy.department}
        />
      </Grid>
    ));

  useEffect(() => {
    //api call for getting all vacancies
    axios
      .get(`${BASE_URL}vacancies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        handleAllVacancies(res.data);
      })
      .catch((err) => console.log(err.message));
    //api call for getting subscribed vacancies
    axios
      .get(`${BASE_URL}vacancies/subscribedvacancies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        handleSubsVacancies(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [token]);

  const handleAllVacancyToggle = () => {
    setVacancyToggle(true);
  };
  const handleSubsVacancyToggle = () => {
    setVacancyToggle(false);
  };

  const allVacanciesCardList = arrtoCard(allVacancies);
  const subsVacanciesCardList = arrtoCard(subsVacancies);

  if(!isLoggedIn){
    return(
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
          You are not Logged In!
        </Typography>
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Vacancies
        </Typography>
        <Tabs value={vacancyToggle ? 0 : 1} centered>
          <Tab label="All Vacancies" onClick={handleAllVacancyToggle} />
          <Tab label="Subscribed Vacancies" onClick={handleSubsVacancyToggle} />
        </Tabs>
        <Grid container spacing={2} justifyContent="center">
          {vacancyToggle ? allVacanciesCardList : subsVacanciesCardList}
        </Grid>
      </Box>
    </Container>
  );
}

export default TeacherVacancy;
