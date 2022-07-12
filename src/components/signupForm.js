import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

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

function SignupForm() {
  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastname: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstname"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastname"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MyTextInput label="Password" name="password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}

export default SignupForm;
