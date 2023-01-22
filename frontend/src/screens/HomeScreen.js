import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/esm/Container";
import data from "../data";
import Carousel from "react-bootstrap/Carousel";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  // const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETC_REQUEST" });
      try {
        const results = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: results.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(results.data);
    };
    fetchData();
  }, []);
  const [color, setColor] = useState(" fa-heart-o");

  const scrollLeft = () => {
    let container = document.querySelector(".cate");
    container.scrollLeft -= 50;
  };

  const scrollRight = () => {
    let container = document.querySelector(".cate");
    container.scrollLeft += 50;
  };
  return (
    <div className="d-flex justify-content-center flex-column">
      <Helmet>
        <title>Hot Picks</title>
      </Helmet>
      <div
        style={{
          backgroundColor: "#D9D9D9",
          transform: "translateY(-2rem)",
          padding: "0.5rem",
        }}
        className="d-flex justify-content-center"
      >
        {userInfo ? (
          <div>
            {`Hello ${userInfo.name}, `}
            Happy Shopping!
          </div>
        ) : (
          "Happy Shopping"
        )}
      </div>
      <Container className="d-flex full-width justify-content-start align-items-center mb-3">
        <div
          className="scroll-left"
          style={{ marginLeft: "-4%", position: "fixed" }}
        >
          <div className="circle">
            <i className="fas fa-arrow-left" onClick={() => scrollLeft()} />
          </div>
        </div>
        {data.products.map((product) => (
          <div
            className="cate"
            key={product.name}
            style={{ marginLeft: "3rem" }}
          >
            <a href={`/product/${product.slug}`}>
              <img src={product.Image} alt={product.name} />
            </a>

            <div
              style={{
                maxWidth: "4rem",
                fontSize: "small",
                color: "#000",
                fontWeight: "bold",
              }}
              className="mt-2"
            >
              {product.name}
            </div>
          </div>
        ))}
        <div
          className="scroll-right"
          style={{ marginLeft: "80%", position: "absolute" }}
        >
          <div className="circle">
            <i className="fas fa-arrow-right" onClick={() => scrollLeft()} />
          </div>
        </div>
      </Container>

      <Carousel className="mb-5">
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/images/highlights/1.png"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="/images/highlights/2.png"
            alt="Image Two"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/images/highlights/3.png"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="/images/highlights/4.jpg"
            alt="Image Two"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="d-flex justify-content-end">
        {" "}
        <h1> Hot Picks</h1>
        <strong>
          <u>see all</u>
        </strong>
      </Container>

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row
            style={{ height: "100px" }}
            className="d-flex justify-content-center"
          >
            {products.map((product) => (
              <Col
                key={product.slug}
                sm={6}
                md={6}
                lg={3}
                xs={6}
                className="mb-3"
              >
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
