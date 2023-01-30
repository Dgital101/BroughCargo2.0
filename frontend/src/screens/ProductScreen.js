import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "../components/Rating";
import Badge from "react-bootstrap/Badge";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Container from "react-bootstrap/esm/Container";

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
  const navigate = useNavigate();
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
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry, Product out of stock");
      return;
    }
    console.log("print sjjn");
    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    // navigate("/cart");

    // window.alert("Proceed to checkout or continue shopping ");
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="d-flex justify-content-end mt-5">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row>
        <Col
          md={3}
          xs={12}
          sm={12}
          className="prod-imgs d-flex justify-content-center"
        >
          <img
            src={product.Image}
            alt={product.name}
            style={{ height: "90%" }}
          />
        </Col>
        <Col
          md={4}
          xs={8}
          sm={8}
          style={{ marginLeft: "30%" }}
          className="d-flex justify-content-center"
        >
          <Card style={{ padding: "1rem" }}>
            <div>{product.name}</div>
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

            <div className="cart2" onClick={addToCartHandler}>
              <small>
                {" "}
                <i
                  className="fa fa-shopping-cart fa-lg"
                  aria-hidden="true"
                ></i>{" "}
                ADD TO CART{" "}
              </small>
            </div>
            <div className="cart2">
              <i className="fa fa-heart-o" aria-hidden="true">
                {" "}
              </i>{" "}
              <small>ADD TO WISHLIST </small>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
