import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import img from "../../assets/images/sign-up.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Alert } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      )
      .required("Required"),
  });

  async function handleLogin(values) {
    setIsLoading(true);
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token",res?.data?.token)
        toast.success("Login Success!");
        navigate("/")
        
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.response?.data?.msg);
        console.log(err?.response?.data?.msg);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema: schema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <div className="row d-flex justify-content-around align-items-center">
        <div className="col-md-7">
          <img src={img} className="w-100" alt="" />
        </div>
        <div className="col-md-5">
          <h2 className="text-danger my-4">Login</h2>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email..."
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <Alert variant="danger" className="mt-2 p-2">
                  {formik.errors.email}
                </Alert>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your Password..."
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <Alert variant="danger" className="mt-2 p-2">
                  {formik.errors.password}
                </Alert>
              ) : null}
            </Form.Group>
            <Button variant="danger" type="submit" disabled={isLoading}>
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
          <p className="mt-4">
            Don't have an account?{" "}
            <span className="text-main font-bold">
              <Link to="/register">Register Now</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
