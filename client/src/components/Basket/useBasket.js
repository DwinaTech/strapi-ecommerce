import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getQuery } from "../ProductView/useProductView";

const useBasket = (token, setIsNewOrdersAdded) => {
  const [basket, setBasket] = useState([]);
  const [updateBasket, setUpdateBasket] = useState(false);
  const { search } = window.location;

  useEffect(() => {
    if (!!token) {
      if (getQuery("success", search) === "true") {
        const deleteBasket = async () => {
          try {
            await axios.delete(`http://localhost:1337/api/baskets/fakeId`, {
              headers: {
                Authorization: `bearer ${token}`,
              },
            });
            toast.success(
              "Order placed! You will receive an email confirmation.",
              {
                hideProgressBar: true,
              }
            );
          } catch (error) {
            console.log({ error });
          }
        };
        deleteBasket();
        setIsNewOrdersAdded(true);
      }
    }
    if (!token) {
      if (getQuery("success", search) === "true") {
        toast.success("Order placed! You will receive an email confirmation.", {
          hideProgressBar: true,
        });
        setBasket([]);
      }
    }
    if (getQuery("cancel", search) === "true") {
      toast.error("Payment is canceled!", {
        hideProgressBar: true,
      });
    }
  }, [search, token]);

  useEffect(() => {
    const getBasketData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`http://localhost:1337/api/baskets`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUpdateBasket(false);
        setBasket(data);
      } catch (error) {
        console.log({ error });
      }
    };
    if (!!token) {
      getBasketData();
    }
  }, [token, updateBasket]);

  const addToBasket = async ({
    id,
    color,
    size,
    imageUrl,
    quantity,
    attributes: {
      name,
      sizes,
      price,
      category,
      description,
      quantity: quantities,
    },
  }) => {
    const isSameProductExistinBasket = basket.filter(
      (product) =>
        Number(product.productId) === Number(id) &&
        product.size == size &&
        product.color == color
    );

    if (!isSameProductExistinBasket.length) {
      try {
        if (!!token) {
          await axios.post(
            "http://localhost:1337/api/baskets",
            {
              data: {
                name,
                price,
                color,
                size,
                sizes,
                imageUrl,
                quantities,
                description,
                productId: id,
                quantity: Number(quantity),
                categoryId: category.data.id,
              },
            },
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          setUpdateBasket(true);
        } else {
          setBasket([
            ...basket,
            {
              name,
              price,
              color,
              size,
              sizes,
              imageUrl,
              quantities,
              description,
              productId: id,
              quantity: Number(quantity),
              categoryId: category.data.id,
            },
          ]);
        }

        toast.success("Added to the basket successfully!", {
          hideProgressBar: true,
        });
      } catch (error) {
        console.log({ error });
      }
    } else {
      toast.error("Same product added to the basket already!", {
        hideProgressBar: true,
      });
    }
  };

  const updateBasketItem = async ({
    color,
    size,
    index,
    imageUrl,
    quantity,
    productId,
    basketItemId,
  }) => {
    try {
      if (!!token) {
        await axios.put(
          `http://localhost:1337/api/baskets/${basketItemId}`,
          {
            data: {
              color,
              size,
              imageUrl,
              quantity: Number(quantity),
            },
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateBasket(true);
      } else {
        const updatedBasket = basket.map((item, idx) => {
          if (index === idx && productId === item.productId) {
            return {
              ...item,
              color,
              size,
              imageUrl,
              quantity: Number(quantity),
            };
          }
          return item;
        });
        setBasket(updatedBasket);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const removeFromBasket = async ({ index, productId, basketItemId }) => {
    try {
      if (!!token) {
        await axios.delete(
          `http://localhost:1337/api/baskets/${basketItemId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateBasket(true);
      } else {
        const basketAfterRemovedItem = basket.filter(
          (item, idx) =>
            (item.productId !== productId && index !== idx) ||
            (item.productId === productId && index !== idx)
        );

        setBasket(basketAfterRemovedItem);
      }
    } catch (error) {
      console.log("Remove item error", { error });
    }
  };

  return { basket, addToBasket, updateBasketItem, removeFromBasket };
};

export default useBasket;
