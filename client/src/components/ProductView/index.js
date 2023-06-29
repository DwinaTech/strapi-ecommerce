import React from "react";
import { useProductView } from "./useProductView";
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Button,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  FormGroup,
  CardSubtitle,
} from "reactstrap";

const ProductView = () => {
  const {
    product,
    getImage,
    selectedColor,
    selectedSize,
    selectedQuantity,
    setSelectedColor,
    setSelectedSize,
    handleQuantityChange,
  } = useProductView();
  if (!product || !product.attributes) {
    return null;
  }
  const { attributes } = product;

  const quantity = Array.from(Array(Number(attributes.quantity)).keys());

  return (
    <Card className="product-details">
      <Row>
        <Col sm="12" md="4">
          <CardImg
            left="true"
            width="100%"
            src={`http://localhost:1337${getImage(selectedColor)}`}
            alt=""
          />
        </Col>
        <Col sm="12" md="8">
          <CardBody>
            <CardTitle>{attributes.name}</CardTitle>
            <CardText>{attributes.description}</CardText>
            <CardSubtitle>
              <strong>Price: £{attributes.price}</strong>
            </CardSubtitle>
            <CardSubtitle>{attributes.quantity} items Left</CardSubtitle>
            <div>
              <CardSubtitle>Sizes:</CardSubtitle>
              <div className="sizes">
                {attributes.sizes.map((size) => (
                  <span
                    key={size.name}
                    className={`${selectedSize === size.name ? "active" : ""}`}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    {size.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <CardSubtitle>Selected colour: {selectedColor}</CardSubtitle>
              <div className="colours">
                {attributes.colours.map((colour) => (
                  <span
                    key={colour.name}
                    className={`${
                      selectedColor === colour.name ? "active" : ""
                    }`}
                    onClick={() => setSelectedColor(colour.name)}
                  >
                    <img
                      src={`http://localhost:1337${getImage(colour.name)}`}
                      alt={colour.name}
                    />
                  </span>
                ))}
              </div>
              <FormGroup className="quantity">
                <Label for="exampleSelect">Selected items</Label>
                <Input
                  value={selectedQuantity}
                  type="select"
                  name="quantity"
                  id="exampleSelect"
                  onChange={handleQuantityChange}
                >
                  {quantity.map((number) => (
                    <option key={number}>{number}</option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <Button color="primary">Add to basket</Button>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductView;
