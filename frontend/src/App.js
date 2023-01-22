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
import { Form, FormControl, Button } from "react-bootstrap";

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

  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            expand="lg"
            style={{ backgroundColor: "#fef9f3" }}
            varient="dark"
            className="d-flex align-items-center"
          >
            <Container
              fluid
              className="d-flex justify-content-around align-items-center"
            >
              <LinkContainer to="/">
                <Navbar.Brand style={{ order: 0 }}>
                  <img
                    src="/images/logo.png"
                    alt="Description of image"
                    className="logo"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Form
                className="d-flex align-items-center rounded"
                style={{
                  width: "30rem",
                  order: 2,
                  transform: "translateX(1rem)",
                }}
              >
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="searchbar"
                  style={{
                    borderRadius: "1.5rem",
                    borderColor: "#E5DBD3",
                    height: "2rem",
                    backgroundColor: "#E5DBD3",
                  }}
                />
                <Button
                  variant="light"
                  style={{
                    transform: "translate(-2.5rem)",
                    margin: "0",
                    backgroundColor: "#E5DBD3",
                    padding: "0rem",
                    borderColor: "#E5DBD3",
                    fontWeight: "700",
                  }}
                >
                  <i
                    className="fas fa-search"
                    style={{ fontWeight: "700" }}
                  ></i>
                </Button>
              </Form>
              <div
                className="d-flex mb-3"
                style={{ order: -1, transform: "translateY(0.6rem)" }}
              >
                <NavbarToggle
                  aria-controls="navbar-content"
                  style={{ border: "none", marginLeft: "0rem" }}
                />
              </div>

              <NavbarCollapse id="navbar-content">
                <Nav className="align-items-center ">
                  <NavDropdown
                    title={"Groups"}
                    id="basic-nav-dropdown"
                    style={{
                      marginRight: "2rem",
                    }}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>My Groups</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Find a Group</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  {userInfo ? (
                    <NavDropdown
                      title={`Hello ${userInfo.name}`}
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </NavbarCollapse>

              <div
                className="d-flex cart-badge-container"
                style={{ order: 1, transform: "translate(1.8rem)" }}
              >
                <Link to="/cart" className="nav-link mx-2">
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
            </Container>
          </Navbar>
        </header>
        <main>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
