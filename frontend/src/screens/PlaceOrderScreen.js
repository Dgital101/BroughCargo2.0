import React, { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 1000 ? round2(0) : round2(50);
  cart.totalPrice = cart.itemsPrice;
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await axios.post(
        "api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>

      <Row style={{ padding: "2rem" }}>
        <h1 className=" text-center">Preview Order</h1>
        <Col md={7}>
          <Card className="mb-3" style={{ backgroundColor: "#e5dbd3" }}>
            <Card.Body>
              <Card.Title>Shipping details</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city} <br />
                <strong>Phone Number:</strong>{" "}
                {cart.shippingAddress.phoneNumber}
              </Card.Text>
              <Link to="/shipping"> Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3 " style={{ backgroundColor: "#e5dbd3" }}>
            <Card.Body>
              <Card.Title className="align-items-center">Items</Card.Title>

              <ListGroup variant="flush" style={{ backgroundColor: "#e5dbd3" }}>
                {cart.cartItems.map((item) => (
                  <ListGroup.Item
                    key={item._id}
                    style={{ backgroundColor: "#e5dbd3" }}
                  >
                    <Row className="align-items-center justify-content-start">
                      <Col md={6} xs={4} fluid className="d-flex flex-row">
                        <Link to={`/product/${item.slug}`}>
                          {" "}
                          <img
                            src={item.Image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{" "}
                        </Link>
                      </Col>
                      <Col md={3} xs={1}>
                        {" "}
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3} xs={5}>
                        {" "}
                        R{item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart"> Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3" style={{ backgroundColor: "#e5dbd3" }}>
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method</strong> {cart.paymentMethod} <br />
              </Card.Text>
              <Link to="/payment"> Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ backgroundColor: "#e5dbd3" }}>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush" style={{ backgroundColor: "#e5dbd3" }}>
                <ListGroup.Item style={{ backgroundColor: "#e5dbd3" }}>
                  <Row style={{ backgroundColor: "#e5dbd3" }}>
                    <Col>Items</Col>
                    <Col>R{cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "#e5dbd3" }}>
                  <Row style={{ backgroundColor: "#e5dbd3" }}>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>R{cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "#e5dbd3" }}>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      style={{
                        background: "#FED034",
                        marginTop: "2rem",
                        borderRadius: "50px",
                        border: "#FED034",
                        color: "#000000",
                      }}
                    >
                      Place Order
                    </Button>
                    {loading && <LoadingBox></LoadingBox>}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
