import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import Rating from "./Rating";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";

function Product(props) {
  const { product } = props;
  const [color, setColor] = useState(" fa-heart-o");
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
          <div className="cart">
            <small>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> ADD{" "}
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
