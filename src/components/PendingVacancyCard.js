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
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";

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

export default function PendingVacancyCard() {
  const [expanded, setExpanded] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      minimumQualification: "",
      minimumExperience: "",
      compensation: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              size="small"
              id="minimumQualification"
              label="Minimum Qualification"
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
              onChange={formik.handleChange}
              value={formik.values.minimumQualification}
            />

            <TextField
              size="small"
              id="minimumExperience"
              label="Minimum Experience"
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
              onChange={formik.handleChange}
              value={formik.values.minimumExperience}
            />

            <TextField
              size="small"
              id="compensation"
              label="Compensation"
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
              onChange={formik.handleChange}
              value={formik.values.compensation}
            />

            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}
