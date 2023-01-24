import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import { Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  const tog = () => {
    const panel = document.querySelector(".tog");
    if (panel.classList.contains("mobile-nav-active")) {
      panel.classList.remove("mobile-nav-active");
      const menu = document.querySelector(".mobile-nav-toggle");
      menu.classList.remove("bx-x");
      menu.classList.add("bx-menu");
    } else {
      panel.classList.add("mobile-nav-active");
      const menu = document.querySelector(".mobile-nav-toggle");
      menu.classList.remove("bx-menu");
      menu.classList.add("bx-x");
    }
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column tog">
        <ToastContainer position="bottom-center" limit={1} />

        <Row style={{ paddingRight: "0rem" }}>
          <Col md={4}>
            <header
              id="header"
              style={{ minHeight: "100%", marginRight: "0rem" }}
            >
              <div className="d-flex flex-column">
                <div className="profile">
                  <img
                    src="images/isaiah.jpeg"
                    alt="image description"
                    className="img-fluid rounded-circle"
                  />

                  <h1
                    className="text-light mb-3"
                    style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
                  >
                    <a href="index.html">Hello Isaiah</a>
                  </h1>
                  <div className="social-links text-center">
                    <a href="#" className="facebook">
                      <i className="bx bx-cart"></i>
                    </a>
                    <a href="#" className="instagram">
                      <i className="bx bx-heart "></i>
                    </a>
                    <a href="#" className="google-plus">
                      <i className="bx bx-bell"></i>
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bx bx-current-location"></i>
                    </a>

                    <a href="#" className="linkedin">
                      <i class="bx bx-group"></i>
                    </a>
                  </div>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                  <ul>
                    <li>
                      <a href="#hero" className="nav-link ">
                        <i
                          className="bx bx-user"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <span>Account Details</span>
                      </a>
                    </li>
                    <li>
                      <a href="#about" className="nav-link scrollto">
                        <i
                          className="bx bx-list-ul "
                          style={{ fontSize: "1.5rem" }}
                        ></i>{" "}
                        <span>Order History</span>
                      </a>
                    </li>
                    <li>
                      <a href="#resume" className="nav-link scrollto">
                        <i
                          className="bx bx-location-plus"
                          style={{ fontSize: "1.5rem" }}
                        ></i>{" "}
                        <span>Saved Location</span>
                      </a>
                    </li>

                    <li>
                      <a href="#services" className="nav-link scrollto">
                        <i
                          className="bx bx-credit-card"
                          style={{ fontSize: "1.5rem" }}
                        ></i>{" "}
                        <span>Payment Method</span>
                      </a>
                    </li>
                    <li>
                      <a href="#portfolio" className="nav-link scrollto">
                        <i
                          className="bx bx-headphone"
                          style={{ fontSize: "1.5rem" }}
                        ></i>{" "}
                        <span>Help Centre</span>
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="nav-link scrollto">
                        <i
                          className="bx bx-log-out"
                          style={{ fontSize: "1.5rem" }}
                        ></i>{" "}
                        <span>Sign Out</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
          </Col>

          <Col md={8} xs={12}>
            <main style={{ marginLeft: "" }}>
              <div className="mb-3">
                <i
                  className="bx bx-menu mobile-nav-toggle d-xl-none"
                  onClick={tog}
                ></i>
              </div>
              <Container
                className="d-flex flex-row mt-1"
                style={{ marginLeft: "0rem" }}
              >
                <div
                  className="d-flex cart-badge-container"
                  style={{ marginTop: "1rem" }}
                >
                  <Link to="/cart" className="nav-link ">
                    <i
                      className="fa fa-shopping-cart fa-lg"
                      aria-hidden="true"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "40px",
                      }}
                    ></i>{" "}
                  </Link>
                  {cart.cartItems.length > 0 && (
                    <span
                      style={{
                        transform: "translate(-1.5rem)",
                        paddingLeft: "0rem",
                      }}
                    >
                      <Badge
                        pill
                        bg="danger"
                        className="mx-2"
                        style={{
                          transform: "translateY(-1rem)",
                        }}
                      >
                        {cart.cartItems.length}
                      </Badge>
                    </span>
                  )}
                </div>
                <LinkContainer to="/" style={{ marginLeft: "2rem" }}>
                  <Navbar.Brand>
                    <img
                      src="/images/logo.png"
                      alt="Description of image"
                      className="logo"
                    />
                  </Navbar.Brand>
                </LinkContainer>
              </Container>

              <Form
                className="d-flex align-items-center rounded"
                style={{
                  width: "25rem",
                  // position: "absolute",
                }}
              >
                <Button
                  variant="light"
                  style={{
                    transform: "translate(2rem)",
                    marginTop: "1.2rem",
                    padding: "0rem",
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                  }}
                >
                  <i
                    class="bx bx-search"
                    style={{
                      fontWeight: "bold",
                    }}
                  ></i>
                </Button>
                <FormControl
                  type="text"
                  placeholder="     Groceries, food, clothes, etc"
                  className="searchbar"
                  style={{
                    borderRadius: "1.5rem",
                    borderColor: "#E5DBD3",
                    height: "2rem",
                    // backgroundColor: "#E5DBD3",
                    color: "#E5DBD3",
                    // marginLeft: "2rem",
                    marginTop: "1rem",
                    padding: "1rem",
                  }}
                />
              </Form>

              <Routes>
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/" element={<HomeScreen />} />
              </Routes>
              <footer></footer>
            </main>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
