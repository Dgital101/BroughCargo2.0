import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
function App() {
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
