import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../Store";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Footer from "../components/Footer";

export default function CartScreen() {
  const navigate = useNavigate();
  const ShippingFee = 50;
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry, Product out of stock");
      return;
    }

    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    cxtDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <Row style={{ padding: "1rem" }}>
        <Col md={6} className="mb-4" fluid>
          <Container fluid>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty! <Link to="/"> Go Shopping</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row
                      className=" align-items-center "
                      style={{ gap: "0rem" }}
                    >
                      <Col md={4} sm={4} xs={3} className="mx-0">
                        <img
                          className="img-fluid rounded img-thumbnail"
                          src={item.Image}
                          alt={item.name}
                        ></img>
                        {"   "}
                        <Link to={`/product/${item.slug}`}> {item.name}</Link>
                      </Col>
                      <Col md={5} sm={3} xs={5} style={{ marginLeft: "-1rem" }}>
                        {" "}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>{" "}
                        <span>{item.quantity}</span>{" "}
                        <Button
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          variant="light"
                          disabled={item.quantity === item.counInStock}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={2} sm={2} xs={2} style={{ marginLeft: "-1rem" }}>
                        R {item.price}
                      </Col>
                      <Col md={2} sm={2} xs={1}>
                        <Button
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Container>
        </Col>

        <Col md={5}>
          <Container fluid>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row className="align-items-center justify-content-between">
                      <Col md={5}>
                        {" "}
                        <span>
                          <small>
                            Subtotal(
                            {cartItems.reduce((a, c) => a + c.quantity, 0)})
                          </small>
                        </span>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <span>
                          <small>
                            R
                            {cartItems.reduce(
                              (a, c) => a + c.price * c.quantity,
                              0
                            )}
                          </small>
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* <ListGroup.Item>
                    <Row className="align-items-center justify-content-between">
                      <Col md={3}>
                        {" "}
                        <span>
                          <small>Shipping</small>
                        </span>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <span>
                          <small>R{ShippingFee}</small>
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item> */}
                  <ListGroup.Item>
                    {/* <Row className="align-items-center justify-content-between">
                      <Col md={3}>
                        {" "}
                        <span>
                          <strong>Total</strong>
                        </span>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <span>
                          <small>
                            R
                            {cartItems.reduce(
                              (a, c) => a + c.price * c.quantity + ShippingFee,
                              0
                            )}
                          </small>
                        </span>
                      </Col>
                    </Row> */}
                    <Row className="align-items-center justify-content-center">
                      <Button
                        onClick={checkoutHandler}
                        variant="pill"
                        style={{
                          background: "#FED034",
                          marginTop: "2rem",
                          borderRadius: "50px",
                        }}
                      >
                        Proceed to Checkout
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
      <footer
        style={{ position: "absolute", left: "0", bottom: "0", right: "0" }}
      >
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}
