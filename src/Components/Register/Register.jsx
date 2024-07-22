import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import img from "../../assets/images/sign-up.jpg"
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
   let navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

  let schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      )
      .required("Required"),
    age: Yup.number()
      .min(12, "Too Young!")
      .max(70, "Too Old!")
      .required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Must be an egyptian phone number")
      .required("Required"),
  });

  async function handleRegister(values) {
    setIsLoading(true)
    await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values).then((res) => {
      setIsLoading(false);
      toast.success("Sign-up Success!");
      navigate("/login");
    }).catch((err) => {
      setIsLoading(false);
      toast.error(err?.response?.data?.msg);
    });
    }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
     validationSchema: schema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="row d-flex justify-content-around align-items-center">
        <div className="col-md-7">
          <img src={img} className="w-100" alt="" />
        </div>
        <div className="col-md-5">
          <h2 className="text-danger my-4">Register</h2>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name..."
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <Alert variant="danger" className="mt-2 p-2">
                  {formik.errors.name}
                </Alert>
              ) : null}
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Yor age..."
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.age && formik.errors.age ? (
                <Alert variant="danger" className="mt-2 p-2">
                  {formik.errors.age}
                </Alert>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Your Phone..."
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Alert variant="danger" className="mt-2 p-2">
                  {formik.errors.phone}
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
            Already have an account?{" "}
            <span className="text-main font-bold">
              <Link to="/login">Login Now</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
