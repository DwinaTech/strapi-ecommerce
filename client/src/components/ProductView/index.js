import React from "react";
import { useProductView } from "./useProductView";
import {
  Row,
  Col,
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
import ProductReview from "../ProductReview";
import { Rating } from "react-simple-star-rating";

const ProductView = ({ token, addToBasket }) => {
  const {
    rating,
    product,
    getImage,
    setRating,
    description,
    selectedColor,
    selectedSize,
    selectedQuantity,
    setSelectedColor,
    setSelectedSize,
    handleQuantityChange,
    setgetLatestProductUpdate,
  } = useProductView();
  if (!product || !product.attributes) {
    return null;
  }
  const { id, attributes } = product;
  const quantity = Array.from(Array(Number(attributes.quantity)).keys());

  return (
    <div className="product-details">
      <Row>
        <Col sm="12" md="6">
          <div className="image-wrapper">
            <CardImg
              left="true"
              width="100%"
              src={`http://localhost:1337${getImage(selectedColor)}`}
              alt=""
            />
          </div>
        </Col>
        <Col sm="12" md="6">
          <CardBody>
            <CardTitle>{attributes.name}</CardTitle>
            <CardText>{attributes.description}</CardText>
            <Rating allowFraction readonly size={24} initialValue={rating} />
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
            <Button
              color="primary"
              onClick={() =>
                addToBasket({
                  ...product,
                  description,
                  size: selectedSize,
                  color: selectedColor,
                  quantity: selectedQuantity,
                  imageUrl: getImage(selectedColor),
                })
              }
            >
              Add to basket
            </Button>
          </CardBody>
        </Col>
      </Row>

      <ProductReview
        token={token}
        productId={id}
        setRating={setRating}
        setgetLatestProductUpdate={setgetLatestProductUpdate}
      />
    </div>
  );
};

export default ProductView;
