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

  return (
    <div className="d-flex justify-content-center flex-column">
      <Helmet>
        <title>Hot Picks</title>
      </Helmet>

      <Container className="d-flex full-width justify-content-between align-items-center mb-3 mt-4">
        {data.products.map((product) => (
          <div className="cate" key={product.name}>
            <a
              href={`/product/${product.slug}`}
              style={{
                marginRight: "2rem",
              }}>
              <img src={product.Image} alt={product.name} />
            </a>

            <div
              style={{
                maxWidth: "4rem",
                fontSize: "small",
                color: "#000",
                fontWeight: "bold",
                marginRight: "2rem",
              }}
              className="mt-2">
              {product.name}
            </div>
          </div>
        ))}
      </Container>

      <Carousel className="mb-5" controls={false}>
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

      <Container className="d-flex justify-content-between ">
        {" "}
        <h4> Hot Picks</h4>
        <strong>
          <u>see all</u>
        </strong>
      </Container>

      <div className="products" style={{ backgroundColor: "#f5f8fa" }}>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row
            style={{ height: "100px" }}
            className="d-flex justify-content-center">
            {products.map((product) => (
              <Col
                key={product.slug}
                sm={6}
                md={6}
                lg={3}
                xs={6}
                className="mb-3">
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
