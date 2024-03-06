import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TransporterComponent from "./screens/TransporterScreen";
import DriverSignupPage from "./screens/DriverSignupScreen";
import TransporterListScreen from "./screens/TransporterListScreen";

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
      style={{ maxWidth: "100%", marginLeft: "auto", overflow: "hidden" }}
      className="d-flex justify-content-center">
      <div
        className="d-flex flex-column tog"
        style={{ maxWidth: "100%", marginLeft: "auto" }}>
        <ToastContainer position="bottom-center" limit={1} />

        <Row style={{ paddingRight: "0rem" }} className="no-gutters">
          <Col md={4} className="no-gutters">
            <header
              id="header"
              style={{ minHeight: "100%", marginRight: "0rem" }}>
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
                    }}>
                    {userInfo ? <>Hello {userInfo.name}</> : <>Hello Shopper</>}
                  </h3>
                  {userInfo && userInfo.isAdmin && (
                    <div className="social-links d-flex flex-row justify-content-center">
                      <LinkContainer to="/admin/dashboard">
                        <div className="d-flex justify-content-center flex-column m-2">
                          <a href="#" className="instagram">
                            <i className="bx bx-pie-chart-alt-2"></i>
                          </a>
                          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                            Dashboard
                          </p>
                        </div>
                      </LinkContainer>

                      <LinkContainer to="/admin/products">
                        <div className="d-flex justify-content-center flex-column m-2">
                          <a href="#" className="instagram">
                            <i className="bx bxs-shopping-bags"></i>
                          </a>
                          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                            Products
                          </p>
                        </div>
                      </LinkContainer>

                      <LinkContainer to="/admin/orders">
                        <div className="d-flex justify-content-center flex-column m-2">
                          <a href="#" className="google-plus">
                            <i className="bx bx-receipt"></i>
                          </a>
                          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                            Orders
                          </p>
                        </div>
                      </LinkContainer>

                      {/* <LinkContainer to="/admin/users">
                        <div className="d-flex justify-content-center flex-column m-2">
                          <a href="#" className="linkedin">
                            <i className="bx bx-group"></i>
                          </a>
                          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                            Users
                          </p>
                        </div>
                      </LinkContainer> */}

                      <LinkContainer to="/admin/transporters">
                        <div className="d-flex justify-content-center flex-column m-2">
                          <a href="#" className="twitter">
                            <i className="bx bxs-truck"></i>
                          </a>
                          <p style={{ fontSize: "10px", fontWeight: "bold" }}>
                            Transporters
                          </p>
                        </div>
                      </LinkContainer>
                    </div>
                  )}
                  <Container style={{ color: "gray" }}>
                    {" "}
                    Buyer Information View
                  </Container>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                  <ul>
                    <li>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          {" "}
                          <i
                            className="bx bx-user"
                            style={{ fontSize: "1.5rem" }}></i>
                          <span>Account Details</span>
                        </NavDropdown.Item>
                      </LinkContainer>
                    </li>
                    <li>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>
                          {" "}
                          <i
                            className="bx bx-list-ul "
                            style={{ fontSize: "1.5rem" }}></i>{" "}
                          <span>Order History</span>
                        </NavDropdown.Item>
                      </LinkContainer>
                    </li>
                    <li>
                      <a href="#resume" className="nav-link scrollto">
                        <i
                          className="bx bx-location-plus"
                          style={{ fontSize: "1.5rem" }}></i>{" "}
                        <span>Saved Location</span>
                      </a>
                    </li>

                    <li>
                      <LinkContainer to="/transporters">
                        <NavDropdown.Item>
                          <i
                            className="bx bxs-truck"
                            style={{ fontSize: "1.5rem" }}></i>{" "}
                          <span>Transporters</span>
                        </NavDropdown.Item>
                      </LinkContainer>
                    </li>
                    <li>
                      <a href="#portfolio" className="nav-link scrollto">
                        <i
                          className="bx bx-headphone"
                          style={{ fontSize: "1.5rem" }}></i>{" "}
                        <span>Help Centre</span>
                      </a>
                    </li>
                    <li>
                      {userInfo ? (
                        <Link
                          className="dropdown-item"
                          to="/signout"
                          onClick={signoutHandler}>
                          <i
                            className="bx bx-log-out"
                            style={{ fontSize: "1.5rem" }}></i>{" "}
                          <span>Sign Out</span>
                        </Link>
                      ) : (
                        <Link className="dropdown-item" to="/signin">
                          <i
                            className="bx bx-log-in"
                            style={{ fontSize: "1.5rem" }}></i>{" "}
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
                  onClick={tog}></i>
              </div>

              <Container
                className="d-flex flex-row mt-1 "
                style={{ marginLeft: "0rem" }}>
                <LinkContainer
                  to="/cart"
                  className="d-flex cart-badge-container"
                  style={{ marginTop: "1rem", cursor: "pointer" }}>
                  <div>
                    <i
                      className="fa fa-shopping-cart fa-lg"
                      aria-hidden="true"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "40px",
                      }}></i>

                    {cart.cartItems.length >= 0 && (
                      <span
                        style={{
                          transform: "translate(-1.5rem)",
                          paddingLeft: "0rem",
                        }}>
                        <Badge
                          pill
                          bg="danger"
                          className="mx-2"
                          style={{
                            transform: "translateY(-1rem)",
                          }}>
                          {cart.cartItems.length}
                        </Badge>
                      </span>
                    )}
                  </div>
                </LinkContainer>
                <LinkContainer
                  to="/"
                  style={{ order: -1 }}
                  className="logoCont">
                  <Navbar.Brand>
                    <img
                      src="/images/logo.png"
                      alt="Description of image"
                      className="logo d-flex justify-content-center"
                    />
                  </Navbar.Brand>
                </LinkContainer>
              </Container>

              <SearchBox />

              <Routes>
                {/* <Route path="/product/:slug" element={<ProductScreen />} /> */}
                <Route path="/product/:slug" element={<NewProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/drivers-signup" element={<DriverSignupPage />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route
                  path="/orderhistory"
                  element={<OrderHistoryScreen />}></Route>
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route
                  path="admin/dashboard"
                  element={
                    <AdminRoute>
                      <DashboardScreen />
                    </AdminRoute>
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
                  path="admin/transporters"
                  element={
                    <AdminRoute>
                      <TransporterListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/product/:id"
                  element={
                    <AdminRoute>
                      <ProductEditScreen />
                    </AdminRoute>
                  }></Route>
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <OrderListScreen />
                    </AdminRoute>
                  }></Route>

                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <UserListScreen />
                    </AdminRoute>
                  }></Route>
                <Route
                  path="/admin/user/:id"
                  element={
                    <AdminRoute>
                      <UserEditScreen />
                    </AdminRoute>
                  }></Route>
                <Route path="/" element={<HomeScreen />} />
                <Route
                  path="/transporters"
                  element={<TransporterComponent />}
                />
              </Routes>
            </main>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
