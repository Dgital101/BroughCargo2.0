import axios from "axios";
import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";

const DriverSignupPage = () => {
  const [name, setName] = useState("");
  const [truckType, setTruckType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // ...

  const submitHandler = (e) => {
    e.preventDefault();

    // Perform form validation
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }

    // Create a new driver object
    const newDriver = {
      name,
      truckType,
      priceRange,
      location,
      phoneNumber,
      email,
      password,
      isVerified: false,
    };

    // Send the new driver data to the server (e.g., using an API call with Axios)
    axios
      .post("/api/transporters/signup", newDriver)
      .then((response) => {
        // Handle the response from the server
        // For example, display a success message or redirect to another page
        navigate("/transporters");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        // Display an error message or perform any necessary actions
        toast.error(getError(error));
      });
  };

  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "10%" }}
    >
      <Card style={{ width: "40%" }}>
        <Card.Header
          style={{
            backgroundColor: "#e5dbd3",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h5>Transporter Sign Up</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="truckType">
              <Form.Label>Truck Type</Form.Label>
              <Form.Control
                type="text"
                value={truckType}
                onChange={(e) => setTruckType(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="priceRange">
              <Form.Label>Price Range</Form.Label>
              <Form.Control
                type="text"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              className="mb-5 mt-4"
              style={{
                backgroundColor: "burlywood",
                color: "#19234D",
                width: "100%",
                borderRadius: "50px",
                borderColor: "burlywood",
              }}
            >
              Sign Up
            </Button>
          </Form>

          <div className="mb-3 text-center">
            Already Have an Account? <Link to={`/signin`}>Sign In</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DriverSignupPage;
