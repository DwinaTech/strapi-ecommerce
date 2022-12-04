import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Button, FormGroup, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storeUser } from "../../helpers";

const initialUser = {
  password: "",
  identifier: "",
};

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (user.identifier && user.password) {
        console.log({ user });
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/auth/local`,
          user
        );
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <Row className="login">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div>
          <h2>Login:</h2>
          <FormGroup>
            <Input
              type="email"
              name="identifier"
              value={user.identifier}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
          <h6>
            Click <Link to="/register">Here</Link> to sign up
          </h6>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
