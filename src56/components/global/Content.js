import React, { Component } from 'react';

import './css/Content.css';

import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';




class Content extends Component {
  render() {
    return (
      <div className="Content">
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
      </div>
    );
  }
}

export default Content;