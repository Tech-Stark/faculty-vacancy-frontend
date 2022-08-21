import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import depts from "../department_data.json";
import positions from "../positions.json";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BASE_URL, configToken } from "../../utils/api";

const theme = createTheme();

const user = {
  firstName: "Ramyanil",
  lastName: "Raha",
  dob: "2000-01-14",
  email: "abc@abc.com",
  isOpenToWork: true,
  phoneNo: "",
  position: "",
  department: "",
  college: "",
  doj: "",
};

const deptArrayOptions = depts.map((dept) => (
  <option value={dept.department} key={dept.id}>
    {dept.department}
  </option>
));

const positionArrayOptions = positions.map((postn) => (
  <option key={postn.id} value={postn.department}>
    {postn.department}
  </option>
));

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...field}
        {...props}
        margin="dense"
        size="small"
        fullWidth
        helperText={meta.touched && meta.error ? meta.error : null}
        error={meta.touched && Boolean(meta.error)}
      />
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  dob: Yup.date("Select a valid Date!")
    .max(new Date(), "DOB can not be in future!")
    .required("This field is required!"),
  doj: Yup.date("Select a valid Date!").max(
    new Date(),
    "DOJ can not be in future!"
  ),
  department: Yup.string().required("Required"),
  phoneNo: Yup.number().required("Required"),
});

const handleSubmit = (values) => {
  console.log(values);
};

const Profile = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
          {isLoggedIn ? (
            <>
              <Typography variant="h3" gutterBottom>
                Personal Biodata
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Formik
                  initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dob: user.dob,
                    isOpenToWork: user.isOpenToWork,
                    department: "",
                    position: "",
                    college: "",
                    doj: "",
                    phoneNo: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="First Name"
                          name="firstName"
                          type="text"
                          disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="Last Name"
                          name="lastName"
                          type="text"
                          disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="jane@formik.com"
                          disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="Date of Birth"
                          name="dob"
                          type="date"
                          disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="Phone Number"
                          name="phoneNo"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="Date of Joining"
                          name="doj"
                          type="date"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MySelect label="Position" name="position">
                          <option value="">Select a Department</option>
                          {positionArrayOptions}
                        </MySelect>
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextInput
                          label="College"
                          name="college"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MySelect label="Department" name="department">
                          <option value="">Select a Department</option>
                          {deptArrayOptions}
                        </MySelect>
                      </Grid>
                      <Grid item xs={12}>
                        <MyCheckbox name="isOpenToWork">
                          Are you open to Work?
                        </MyCheckbox>
                      </Grid>
                    </Grid>

                    <button type="submit">SUBMIT</button>
                  </Form>
                </Formik>
              </Box>
            </>
          ) : (
            <>
              <h1>You need to Login first</h1>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
