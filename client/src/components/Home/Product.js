import React from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

const Product = ({ product, orderCard }) => {
  const image = orderCard ? {} : product.attributes.images.data[0].attributes;

  return (
    <Card className="product-card">
      <div className="image-wrapper">
        <CardImg
          top
          width="100%"
          src={`http://localhost:1337${
            orderCard ? product.imageUrl : image.url
          }`}
          alt={orderCard ? product.name : image.name}
        />
      </div>
      <CardBody>
        <CardTitle>
          {orderCard ? product.name : product.attributes.name}
        </CardTitle>
        <CardText>
          {orderCard ? product.description : product.attributes.description}
        </CardText>
        {orderCard ? (
          <CardSubtitle className="qunatity">
            <strong>Quantity: {product.quantity}</strong>
          </CardSubtitle>
        ) : null}
        <CardSubtitle>
          <strong>
            Price: £{orderCard ? product.price : product.attributes.price}
          </strong>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default Product;
