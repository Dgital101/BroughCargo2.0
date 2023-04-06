import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <Form
      className="d-flex"
      onSubmit={submitHandler}
      style={{
        width: "90%",
        backgroundColor: "#f5f8fa",
        marginLeft: "auto",
        marginRight: "auto",
        sticky: "top",
      }}
    >
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
          style={{
            borderRadius: "1.5rem",
            borderColor: "#000",
            height: "2.3rem",
            borderTopRightRadius: "0rem",
            borderBottomRightRadius: "0rem",
            backgroundColor: "transparent",
            color: "#E5DBD3",
            marginTop: "1rem",
          }}
        ></FormControl>

        <Button
          variant="light"
          type="submit"
          id="button-search"
          style={{
            borderRadius: "1.5rem",
            borderColor: "#000",
            height: "2.3rem",
            borderTopLeftRadius: "0rem",
            borderBottomLeftRadius: "0rem",
            fontWeight: "bold",
            backgroundColor: "#f5f8fa",
            marginTop: "1rem",
          }}
        >
          <i
            className="bx bx-search"
            style={{
              fontWeight: "bold",
              backgroundColor: "#f5f8fa",
              border: "none",
            }}
          ></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
