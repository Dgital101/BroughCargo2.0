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
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NewProductScreen from "./screens/NewProductScreen";

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
    <BrowserRouter
      style={{ maxWidth: "100%", marginLeft: "auto" }}
      className="d-flex justify-content-center"
    >
      <div
        className="d-flex flex-column tog"
        style={{ maxWidth: "100%", marginLeft: "auto" }}
      >
        <ToastContainer position="bottom-center" limit={1} />

        <Row style={{ paddingRight: "0rem" }} className="no-gutters">
          <Col md={4} className="no-gutters">
            <header
              id="header"
              style={{ minHeight: "100%", marginRight: "0rem" }}
            >
              <div className="d-flex flex-column">
                <div className="profile">
                  <img
                    src="images/user.png"
                    alt="image description"
                    className="img-fluid rounded-circle"
                  />

                  <h3
                    className="text-light mb-3 d-flex justify-content-center"
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {userInfo ? <>Hello {userInfo.name}</> : <>Hello Shopper</>}
                  </h3>
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
                    {userInfo && userInfo.Admin && (
                      <div>
                        <a href="#" className="linkedin">
                          <i className="bx bx-group"></i>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}

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
                      {userInfo ? (
                        <Link
                          className="dropdown-item"
                          to="#signout"
                          onClick={signoutHandler}
                        >
                          <i
                            className="bx bx-log-out"
                            style={{ fontSize: "1.5rem" }}
                          ></i>{" "}
                          <span>Sign Out</span>
                        </Link>
                      ) : (
                        <Link className="dropdown-item" to="/signin">
                          <i
                            className="bx bx-log-in"
                            style={{ fontSize: "1.5rem" }}
                          ></i>{" "}
                          <span>Sign In</span>
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
          </Col>

          <Col md={8} xs={12} sm={12} className="main">
            <main style={{}}>
              <div className="mb-3 ">
                <i
                  className="bx bx-menu mobile-nav-toggle d-md-none"
                  onClick={tog}
                ></i>
              </div>

              <Container
                className="d-flex flex-row mt-1 "
                style={{ marginLeft: "0rem" }}
              >
                <LinkContainer
                  to="/cart"
                  className="d-flex cart-badge-container"
                  style={{ marginTop: "1rem", cursor: "pointer" }}
                >
                  <div>
                    <i
                      className="fa fa-shopping-cart fa-lg"
                      aria-hidden="true"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "40px",
                      }}
                    ></i>

                    {cart.cartItems.length >= 0 && (
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
                </LinkContainer>
                <LinkContainer
                  to="/"
                  style={{ order: -1 }}
                  className="logoCont"
                >
                  <Navbar.Brand>
                    <img
                      src="/images/logo.png"
                      alt="Description of image"
                      className="logo d-flex justify-content-center"
                    />
                  </Navbar.Brand>
                </LinkContainer>
              </Container>

              <Form
                className="d-flex align-items-center rounded"
                style={{
                  width: "96%",
                  backgroundColor: "#f5f8fa",

                  sticky: "top",
                }}
              >
                <Button
                  variant="light"
                  style={{
                    transform: "translate(2rem)",
                    marginTop: "1.2rem",
                    padding: "0rem",
                    fontWeight: "bold",
                    backgroundColor: "#f5f8fa",
                  }}
                >
                  <i
                    className="bx bx-search"
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f8fa",
                    }}
                  ></i>
                </Button>
                <FormControl
                  type="text"
                  placeholder="     Groceries, food, clothes, etc"
                  className="searchbar"
                  style={{
                    borderRadius: "1.5rem",
                    borderColor: "#000",
                    height: "2rem",

                    backgroundColor: "#f5f8fa",

                    color: "#E5DBD3",
                    // marginLeft: "2rem",
                    marginTop: "1rem",
                    padding: "1rem",
                  }}
                />
              </Form>

              <Routes>
                {/* <Route path="/product/:slug" element={<ProductScreen />} /> */}
                <Route path="/product/:slug" element={<NewProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route
                  path="admin/dashboard"
                  element={
                    // <AdminRoute>
                    <DashboardScreen />
                    // </AdminRoute>
                  }
                />
                <Route
                  path="admin/products"
                  element={
                    <AdminRoute>
                      <ProductListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/product/:id"
                  element={
                    <AdminRoute>
                      <ProductEditScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route path="/" element={<HomeScreen />} />
              </Routes>
            </main>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
