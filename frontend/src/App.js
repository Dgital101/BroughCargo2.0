import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
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
          <Navbar style={{ backgroundColor: "#fef9f3" }} varient="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  {" "}
                  <img
                    src="/images/logo.png"
                    alt="Description of image"
                    className="logo"
                  />{" "}
                </Navbar.Brand>
              </LinkContainer>

              <Nav className="mt-3">
                {userInfo ? (
                  <NavDropdown
                    style={{ Position: "absolute" }}
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
                <Link to="/cart" className="nav-link">
                  <i
                    className="fa fa-shopping-cart fa-lg"
                    aria-hidden="true"
                    style={{ transform: "translateX(-0.5rem)" }}
                  ></i>{" "}
                  {cart.cartItems.length > 0 && (
                    <span>
                      <Badge
                        pill
                        bg="danger"
                        style={{
                          // transform: "translateX(3rem)",
                          transform: "translateY(-2.5rem)",
                          padding: "0.1rem",
                        }}
                      >
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    </span>
                  )}
                </Link>
              </Nav>
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
            <Route path="/" element={<HomeScreen />} />
          </Routes>
          <footer></footer>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
