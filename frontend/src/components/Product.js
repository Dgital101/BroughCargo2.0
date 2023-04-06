import { Link } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [color, setColor] = useState(" la-heart");

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry, Product out of stock");
      return;
    }

    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    <Container
      className="d-flex  justify-content-center"
      style={{ backgroundColor: "#f5f8fa" }}
    >
      <Card style={{ backgroundColor: "#f5f8fa", width: "22rem" }}>
        <Link
          to={`/product/${product.slug}`}
          className="d-flex justify-content-center "
        >
          <img
            src={product.Image}
            className="image-container"
            alt={product.name}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
            }}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title className="prod-name" style={{ minHeight: "2.2rem" }}>
              {product.name}
            </Card.Title>
          </Link>
          {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
          <Card.Text className="prod-price mb-5">
            <small>R{product.price}</small>
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button
              variant="light"
              disabled
              style={{ paddingTop: "0.1rem", paddingBottom: "0.1rem" }}
            >
              {" "}
              <small>Sold Out</small>
            </Button>
          ) : (
            <div
              className="cart d-flex align-items-end justify-content-center"
              onClick={() => addToCartHandler(product)}
              style={{ width: "100%" }}
            >
              <small>
                {" "}
                <strong>
                  <i
                    className="fa fa-shopping-cart fa-lg"
                    aria-hidden="true"
                  ></i>{" "}
                  ADD{" "}
                </strong>
              </small>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Product;
