import React from "react";

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const Product = ({ product }) => {
  console.log({ product });
  const image = product.attributes.images.data[0].attributes;
  console.log({ image });

  return (
    <Card className="product-card">
      <CardImg
        top
        width="100%"
        src={`http://localhost:1337${image.url}`}
        alt={image.name}
      />
      <CardBody>
        <CardTitle>{product.attributes.name}</CardTitle>
        <CardSubtitle>
          <strong>Price: £{product.attributes.price}</strong>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default Product;
