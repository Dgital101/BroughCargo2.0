import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import { Link } from "react-router-dom";
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div>
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
            <Route path="/" element={<HomeScreen />} />
          </Routes>
          <footer></footer>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
