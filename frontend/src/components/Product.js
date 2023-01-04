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
  const [color, setColor] = useState(" fa-heart-o");

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
    <div className="container">
      <Card className="card">
        <div className="wishlist">
          <i className={`fa ${color}`} onClick={() => setColor("fa-heart")}></i>
        </div>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.Image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title className="prod-name">{product.name}</Card.Title>
          </Link>
          {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
          <Card.Text className="prod-price">
            <small>R{product.price}</small>
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              {" "}
              Sold Out
            </Button>
          ) : (
            <div className="cart" onClick={() => addToCartHandler(product)}>
              <small>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> ADD{" "}
              </small>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
