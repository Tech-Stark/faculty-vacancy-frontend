import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, configToken } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";

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

export default function OngoingVacancyCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRemoved, setIsRemoved] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const { isLoggedIn, token, isAdmin } = useSelector((state) => state.auth);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRemove = () => {
    if (isLoggedIn && isAdmin) {
      setIsLoading(true);
      axios
        .get(
          `${BASE_URL}admin/deletevacancy/${item.vacancyId}`,
          configToken(token)
        )
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setIsRemoved(true);
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
    }
  };

  const handleCompleted = () => {
    if (isLoggedIn && isAdmin) {
      setIsLoading(true);
      axios
        .post(
          `${BASE_URL}admin/markcompleted/${item.vacancyId}`,
          {},
          configToken(token)
        )
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setIsCompleted(true);
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <Card>
      <CardHeader title={item.position} subheader={item.department} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          College : {item.college}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location : {item.location}
        </Typography>
      </CardContent>

      {isLoading ? (
        <CircularProgress color="primary" size={25} />
      ) : (
        <CardActions disableSpacing>
          <Button
            onClick={handleRemove}
            disabled={isCompleted || isRemoved}
            color="error"
            variant="contained"
            sx={{ ml: 1, mr: 1 }}
          >
            Remove
          </Button>
          <Button
            disabled={isCompleted || isRemoved}
            onClick={handleCompleted}
            color="success"
            variant="contained"
            sx={{ ml: 1, mr: 1 }}
          >
            Completed
          </Button>
          <Link
            to={`/admin/sendmail/${item.vacancyId}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              color="primary"
              disabled={isCompleted || isRemoved}
              sx={{ ml: 1, mr: 1 }}
            >
              Send Invite
            </Button>
          </Link>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Minimum Qualification: {item.minimumQualification}
          </Typography>
          <Typography>Minimum Experience: {item.minimumExperience}</Typography>
          <Typography>Compensation: {item.compensation}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
