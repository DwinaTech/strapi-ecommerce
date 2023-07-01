import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "reactstrap";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import CustomNav from "./components/CustomNav";
import { ToastContainer } from "react-toastify";
import ProductView from "./components/ProductView";

function App() {
  return (
    <div>
      <CustomNav />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/product-details/:id" element={<ProductView />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
