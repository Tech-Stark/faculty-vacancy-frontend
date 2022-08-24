import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import OngoingVacancyCard from "../../components/OngoingVacancyCard";
import PendingVacancyCard from "../../components/PendingVacancyCard";

export default function AdminVacancy() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ongoing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OngoingVacancyCard />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Pending</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PendingVacancyCard />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
