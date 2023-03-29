import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          <Col className="text-center py-3">©2023 E-commerce Site</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
