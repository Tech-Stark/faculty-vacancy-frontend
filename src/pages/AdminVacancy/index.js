import { useState } from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Ongoing from "./Ongoing";
import Pending from "./Pending";
import Completed from "./Completed";

export default function AdminVacancy() {
  const [value, setValue] = useState("one");

  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isLoggedIn || !isAdmin) {
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

        <Grid container spacing={2} justifyContent="center">
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Pending" />
            <Tab value="two" label="Ongoing" />
            <Tab value="three" label="Completed" />
          </Tabs>
        </Grid>

        {value === "one" ? (
          <Pending />
        ) : value === "two" ? (
          <Ongoing />
        ) : (
          <Completed />
        )}
      </Box>
    </Container>
  );
}
