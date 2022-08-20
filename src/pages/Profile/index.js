import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import depts from "../department_data.json";

const user = {
  firstName: "Ramyanil",
  lastName: "Raha",
  dob: "2000-01-14",
  email: "abc@abc.com",
  isOpenToWork: true,
};

const deptArrayOptions = depts.map((dept) => (
  <option value={dept.department} key={dept.id}>
    {dept.department}
  </option>
));

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
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
  // isOpenToWork: Yup.boolean(),
  department: Yup.string().required("Required"),
});

// const handleSubmit = ({ values }) => {
//   console.log(values);
// };

const Profile = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Fill in your Personal Details!</h1>
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dob: user.dob,
              isOpenToWork: user.isOpenToWork,
              department: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
            // onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            //   }, 400);
            // }}
          >
            <Form>
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                disabled="true"
              />

              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                disabled="true"
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />

              <MyTextInput
                label="Date of Birth"
                name="dob"
                type="date"
                disabled="true"
              />

              <MySelect label="Department" name="department">
                <option value="">Select a Department</option>
                {deptArrayOptions}
              </MySelect>

              <MyCheckbox name="isOpenToWork">Are you open to Work?</MyCheckbox>

              <button type="submit">SUBMIT</button>
            </Form>
          </Formik>
        </>
      ) : (
        <>
          <h1>You need to Login first</h1>
        </>
      )}
    </>
  );
};

export default Profile;
