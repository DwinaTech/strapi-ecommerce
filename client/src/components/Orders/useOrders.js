import axios from "axios";
import React, { useState, useEffect } from "react";

const useOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [isNewOrdersAdded, setIsNewOrdersAdded] = useState(false);

  useEffect(() => {
    const getBasketData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`http://localhost:1337/api/orders`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setIsNewOrdersAdded(false);
        setOrders(data.reverse());
      } catch (error) {
        console.log({ error });
      }
    };
    if (!!token) {
      getBasketData();
    }
  }, [token, isNewOrdersAdded]);

  return { orders, setIsNewOrdersAdded };
};

export default useOrders;
