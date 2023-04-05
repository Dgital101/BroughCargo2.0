import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export default function CheckoutSteps(props) {
  return (
    <Row
      className="checkout-steps"
      style={{
        padding: "0rem",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1rem",
      }}
    >
      <Col className={props.step1 ? "active" : ""}>login</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      <Col className={props.step4 ? "active" : ""}>Order</Col>
    </Row>
  );
}
