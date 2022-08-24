import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OngoingVacancyCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title="Assistant Professor"
        subheader="Electrical Engineering"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          College : National Institute of Technology Durgapur
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location : Durgapur, West Bengal
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="remove">
          <CancelIcon color="error" />
        </IconButton>
        <IconButton aria-label="done">
          <CheckCircleIcon color="success" />
        </IconButton>
        <IconButton aria-label="email">
          <SendIcon color="primary" />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Minimum Qualification : B.Tech</Typography>
          <Typography>Minimum Experience : 0 years</Typography>
          <Typography>Compensation : 12 Lakhs per Annum</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
