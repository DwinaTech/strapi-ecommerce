import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Button, FormGroup, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialUser = {
  email: "",
  username: "",
  password: "",
};

const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      if (user.username && user.email && user.password) {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/auth/local/register`,
          user
        );
        if (!!res) {
          toast.success("Registered successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/login");
        }
        console.log({ res });
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <Row className="register">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div>
          <h2>Sign up:</h2>
          <FormGroup>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Enter your full name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <Button onClick={signUp} color="primary">
            Sign up
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Registration;
