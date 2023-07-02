import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [confirmpassword, setConfirmPassword] = useState(" ");

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });

      cxtDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
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
          <h5>Sign Up</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                required
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "10px",
                  color: "#19234D",
                  fontSize: "0.9em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
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
            <Link to={`/drivers-signup`}>Signup as a transporter</Link>
          </div>

          <div className="mb-3 text-center">
            Already Have an Account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
