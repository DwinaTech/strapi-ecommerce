import React from "react";
import { Row, Col, Button, Form, FormGroup, Input } from "reactstrap";

const Registration = () => (
  <Row className="register">
    <Col sm="12" md={{ size: 4, offset: 4 }}>
      <div>
        <h2>Sign up:</h2>
        <FormGroup>
          <Input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
          />
        </FormGroup>
        <FormGroup>
          <Input type="email" name="email" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="Enter password" />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </div>
    </Col>
  </Row>
);

export default Registration;
