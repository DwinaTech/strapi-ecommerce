import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Protector } from "./helpers";
import Home from "./components/Home";
import Login from "./components/Login";
import { Container } from "reactstrap";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protector Component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
