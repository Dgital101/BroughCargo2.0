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

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      cxtDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
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
      className="d-flex align-items-center justify-content-center"
      style={{
        marginTop: "10%",
      }}
    >
      <Card>
        <Card.Header
          style={{
            backgroundColor: "#e5dbd3",
            color: "#fff",
          }}
        >
          <h5 className="text-center">Sign in</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 mt-5" controlId="username">
              <Form.Control
                type="username"
                placeholder="Username"
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
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

            <Button
              variant="primary"
              type="submit"
              className="mb-5 mt-5"
              style={{
                backgroundColor: "burlywood",
                color: "#19234D",
                width: "100%",
                borderRadius: "50px",
                borderColor: "burlywood",
              }}
            >
              login
            </Button>
          </Form>
          <div className="mb-3 text-center">
            Don't Have an Account?{" "}
            <Link to={`/signup?redirect=${redirect}`}> Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
