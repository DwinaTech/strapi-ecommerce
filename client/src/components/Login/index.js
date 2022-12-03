import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, FormGroup, Input } from "reactstrap";

const Login = () => (
  <Row className="login">
    <Col sm="12" md={{ size: 4, offset: 4 }}>
      <div>
        <h2>Login:</h2>
        <FormGroup>
          <Input type="email" name="email" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="Enter password" />
        </FormGroup>
        <Button color="primary">Submit</Button>
        <h6>
          Click <Link to="/register">Here</Link> to sign up
        </h6>
      </div>
    </Col>
  </Row>
);

export default Login;
