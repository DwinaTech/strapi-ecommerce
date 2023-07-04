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
import { userData } from "./helpers";

function App() {
  const { jwt } = userData();
  const isLoggedIn = !!jwt;
  const { basket, addToBasket, updateBasketItem, removeFromBasket } =
    useBasket(jwt);

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
              path="/basket"
              element={
                <Basket
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
