import React from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

const Product = ({ product }) => {
  const image = product.attributes.images.data[0].attributes;

  return (
    <Card className="product-card">
      <div className="image-wrapper">
        <CardImg
          top
          width="100%"
          src={`http://localhost:1337${image.url}`}
          alt={image.name}
        />
      </div>
      <CardBody>
        <CardTitle>{product.attributes.name}</CardTitle>
        <CardText>{product.attributes.description}</CardText>
        <CardSubtitle>
          <strong>Price: £{product.attributes.price}</strong>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default Product;
