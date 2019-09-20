import React, { Component } from "react";
import { Redirect, HashRouter, Route, Switch, Link } from "react-router-dom";
import firebase from "../../../config/config";
import "firebase/auth";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

import props from "prop-types";
import Admin from "../../Admin/Admin";
const DefaultLayout = React.lazy(() =>
  import("../../../containers/DefaultLayout")
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.authentification = this.authentification.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email: "",
      password: "",
      user: {},
      signedIn: false
    };
  }

  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.setState({ signedIn: true });
      })
      .catch(error => {
        this.setState({ signedIn: false });
        console.log(error);
      });
  }

  componentWillUnmount() {
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     console.log("Signed Out");
    //   })
    //   .catch(e => console.log("error", e));
  }
  componentWillUnmount() {
    console.log("unmounted");
    this.setState({ signedIn: false });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // const Login = ({ onSubmit }) => {

    return (
      <div className="app flex-row align-items-center">
        {this.state.signedIn ? (
          <Redirect to="admin" />
        ) : (
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1>Authentification</h1>
                        <p className="text-muted">
                          Se connecter à votre compte
                        </p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.email}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="E-mail"
                            autoComplete="username"
                            name="email"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            name="password"
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button
                              type="submit"
                              onClick={this.login}
                              color="primary"
                              className="px-4"
                            >
                              Connecter
                            </Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">
                              Mot de passe oublié?
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <CardBody className="text-center">
                      <div>
                        <h2>Inscrivez-vous!</h2>

                        <Link to="/register">
                          <Button
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            S'inscrire
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
  // }
}

export default Login;
