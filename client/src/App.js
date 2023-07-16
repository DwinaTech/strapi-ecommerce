import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "reactstrap";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import CustomNav from "./components/CustomNav";
import { ToastContainer } from "react-toastify";
import ProductView from "./components/ProductView";
import Basket from "./components/Basket";
import useBasket from "./components/Basket/useBasket";
import { Protector, userData } from "./helpers";
import Orders from "./components/Orders";
import useOrders from "./components/Orders/useOrders";

function App() {
  const { jwt } = userData();
  const isLoggedIn = !!jwt;
  const { orders, setIsNewOrdersAdded } = useOrders(jwt);
  const { basket, addToBasket, updateBasketItem, removeFromBasket } = useBasket(
    jwt,
    setIsNewOrdersAdded
  );

  return (
    <div>
      <BrowserRouter>
        <CustomNav basketItems={basket.length} isLoggedIn={isLoggedIn} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/product-details/:id"
              element={<ProductView addToBasket={addToBasket} />}
            />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/orders"
              element={<Protector Component={<Orders orders={orders} />} />}
            />
            <Route
              path="/basket"
              element={
                <Basket
                  token={jwt}
                  basket={basket}
                  updateBasketItem={updateBasketItem}
                  removeFromBasket={removeFromBasket}
                />
              }
            />
          </Routes>
          <ToastContainer />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
