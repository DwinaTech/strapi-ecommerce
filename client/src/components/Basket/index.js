import React from "react";
import { Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import CustomCard from "./Card";

const Basket = ({ basket, updateBasketItem, removeFromBasket }) => {
  const navigate = useNavigate();
  const navigateToProductView = (url) => {
    navigate(url);
  };

  const totalPrice = basket.reduce((acc, value) => {
    const itemPrice = Number(value.price) * Number(value.quantity);
    return acc + itemPrice;
  }, 0);

  return (
    <>
      <div className="basket">
        {basket.length ? <h3>Total price: £{totalPrice}</h3> : null}
        <Row>
          {basket.map((product, idx) => (
            <Col
              sm="12"
              md="3"
              key={`${idx}${product.productId}`}
              onClick={() =>
                navigateToProductView(
                  `/product-details/${product.productId}?color=${product.color}&size=${product.size}`
                )
              }
            >
              <CustomCard
                {...{
                  ...product,
                  index: idx,
                  updateBasketItem,
                  removeFromBasket,
                }}
              />
            </Col>
          ))}
        </Row>
        {basket.length ? (
          <Button color="info" onClick={() => {}}>
            Check out
          </Button>
        ) : null}
      </div>
      {!basket.length ? (
        <div className="empty-basket">
          <h3>Basket is empty</h3>
          <Button
            color="info"
            onClick={() => {
              navigate("/");
            }}
          >
            Go Shopping
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Basket;
