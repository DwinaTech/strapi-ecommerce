import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useProductView = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleQuantityChange = ({ target: { value } }) => {
    setSelectedQuantity(value);
  };

  const getImage = (colour) => {
    const { attributes } = product;
    const image = attributes.images.data.find((image) =>
      image.attributes.name.includes(colour)
    );

    return image.attributes.url || "";
  };

  useEffect(() => {
    if (product && product.attributes) {
      const { attributes } = product;
      setSelectedColor(attributes.colours[0].name);
      setSelectedSize(attributes.sizes[0].name);
    }
  }, [product, setSelectedColor, setSelectedSize]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:1337/api/products/${productId}?populate=*`
        );
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log({ error });
      }
    };

    if (productId) {
      fetchCategories();
    }
  }, [productId]);

  return {
    product,
    getImage,
    selectedSize,
    selectedColor,
    selectedQuantity,
    setSelectedColor,
    setSelectedSize,
    handleQuantityChange,
  };
};
