import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { Card } from "react-bootstrap";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Cash on Delivery"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Helmet>
        <title>Payment Method</title>
      </Helmet>

      <Card
        className="mt-5"
        style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Card.Header
          style={{
            backgroundColor: "#e5dbd3",
            color: "#fff",
          }}
        >
          <h5 className="text-center">Select Payment Method</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {/* <div className="mb-3">
              <Form.Check
                type="radio"
                id="Cash on Delivery"
                label="Cash on Delivery"
                value="Cash on Delivery"
                checked={paymentMethodName === "Cash on Delivery"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div> */}
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Card Payment"
                label="Card Payment"
                value="Card Payment"
                checked={paymentMethodName === "Card Payment"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>
            <div className="mt-1">
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: "burlywood",
                  color: "#19234D",
                  width: "100%",
                  borderRadius: "50px",
                  borderColor: "burlywood",
                }}
              >
                Continue
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <footer
        style={{ position: "absolute", left: "0", bottom: "0", right: "0" }}
      >
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}
