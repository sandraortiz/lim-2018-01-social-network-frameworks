import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                Soy una columna!!!
          </Col>
              <Col xs={12} md={6}>
                Columna2
          </Col>
              <Col xs={12} md={6}>
                Columna3
          </Col>
              <Col xs={12} md={6}>
                columna4
          </Col>
            </Row>
          </Grid>
          
        </p>
       

        <Form inicial="hola mundo desde afuera" />
      </div>
    );
  }
}

export default App;
