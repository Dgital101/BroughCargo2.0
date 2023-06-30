import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  FaWhatsapp,
  FaPhone,
  FaTruck,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TransporterList = ({ transporters }) => {
  return (
    <Row>
      {transporters.map((transporter) => (
        <Col key={transporter._id} xs={10} sm={6} md={4} lg={3}>
          <Card className="mb-3">
            <Card.Img
              variant="top"
              src="https://media.istockphoto.com/id/537266866/photo/trucking-on-the-road.webp?b=1&s=170667a&w=0&k=20&c=MTzRMf4QW3pevCtH0TDpF1i9-gInA7h0txEOKZP1PQc="
              alt="Transporter"
            />
            <Card.Body>
              <Card.Title>{transporter.name}</Card.Title>
              <Card.Text>
                <FaPhone className="mr-1" />
                <span
                  style={{
                    marginLeft: "0.5rem",
                    marginnTop: "1rem",
                    color: "gray",
                  }}
                >
                  {transporter.phoneNumber}
                </span>
              </Card.Text>
              <Card.Text>
                <FaTruck className="mr-1" />
                <span
                  style={{
                    marginLeft: "0.5rem",
                    marginnTop: "1rem",
                    color: "gray",
                  }}
                >
                  {transporter.truckType}
                </span>
              </Card.Text>
              <Card.Text>
                <FaMoneyBill className="mr-1" />

                <span
                  style={{
                    marginLeft: "0.5rem",
                    marginnTop: "1rem",
                    color: "gray",
                  }}
                >
                  {transporter.priceRange}
                </span>
              </Card.Text>
              <Card.Text>
                <span style={{}}>
                  <FaMapMarkerAlt className="mr-1" />
                </span>

                <span
                  style={{
                    marginLeft: "0.5rem",
                    marginnTop: "1rem",
                    color: "gray",
                  }}
                >
                  {transporter.location}
                </span>
              </Card.Text>
              <Button
                variant="success"
                href={`https://api.whatsapp.com/send?phone=${transporter.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex flex-row justify-content-center align-items-center"
              >
                <FaWhatsapp className="mr-2" />{" "}
                <span style={{ marginLeft: "1rem" }}> Contact</span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TransporterList;
