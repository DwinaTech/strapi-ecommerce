import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const getQuery = (key, search) => {
  const querys = search?.replace("?", "")?.split("&");
  const query = querys.find((query) => query.includes(key));
  const queryValue = query?.replace(`${key}=`, "");
  return queryValue;
};

export const useProductView = () => {
  const { id: productId } = useParams();
  const [rating, setRating] = useState(null);
  const [getLatestProductUpdate, setgetLatestProductUpdate] = useState(false);
  const { search } = useLocation();

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

    return image?.attributes?.url || "";
  };

  useEffect(() => {
    if (product && product.attributes) {
      const { attributes } = product;
      setSelectedColor(getQuery("color", search) || attributes.colours[0].name);
      setSelectedSize(getQuery("size", search) || attributes.sizes[0].name);
    }
  }, [product, search, setSelectedColor, setSelectedSize]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:1337/api/products/${productId}?populate=*`
        );
        setProduct(data);
        setgetLatestProductUpdate(false);
      } catch (error) {
        console.log({ error });
      }
    };

    if (productId) {
      fetchCategories();
    }
  }, [productId, getLatestProductUpdate]);

  return {
    rating,
    product,
    getImage,
    setRating,
    selectedSize,
    selectedColor,
    selectedQuantity,
    setSelectedColor,
    setSelectedSize,
    handleQuantityChange,
    setgetLatestProductUpdate,
  };
};
