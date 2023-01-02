import axios from "axios";
import { useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "../components/Rating";
import Badge from "react-bootstrap/Badge";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETC_REQUEST" });
      try {
        const results = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: results.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      // setProducts(results.data);
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="prod2-img"
            src={product.Image}
            alt={product.name}
          ></img>

          <div className="container1">
            <div>
              <img
                className="small-img"
                src={product.Image}
                alt={product.name}
              ></img>
            </div>
            <div>
              <img
                className="small-img"
                src={product.Image}
                alt={product.name}
              ></img>
            </div>
            <div>
              <img
                className="small-img"
                src={product.Image}
                alt={product.name}
              ></img>
            </div>
            <div>
              <img
                className="small-img"
                src={product.Image}
                alt={product.name}
              ></img>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Card className="card2">
            <div className="prod-name2">{product.name}</div>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Subtitle>Description</Card.Subtitle>
            <Card.Text style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </Card.Text>
            <Card.Text className="prod-price">R{product.price}</Card.Text>
            {product.countInStock > 0 ? (
              <Badge bg="success" className="badge">
                In Stock
              </Badge>
            ) : (
              <Badge bg="danger">Out of Stock</Badge>
            )}
            <Card.Text style={{ color: "#D9D9D9" }}>
              {" "}
              <small>Ships in 2-5 days</small>
            </Card.Text>

            <div className="cart2">
              <small>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> ADD
                TO CART{" "}
              </small>
            </div>
            <div className="cart2">
              <small>
                <i className="fa fa-heart-o" aria-hidden="true"></i> ADD TO
                WISHLIST{" "}
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
