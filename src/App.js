import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FilterOptions from './app/FilterOptions';
import Loading from './app/Loading';
import Leaderboard from './app/Leaderboard';
import './App.css';

const isLoading = false;

const App = () => (
  <Container fluid id="app-container">
    <Row className="header">
      {/* <Col xs={4}>
        <h1>FCC Leaderboard</h1>
      </Col> */}
      <Col>
        <FilterOptions />
      </Col>
    </Row>
    <Row className="body">{isLoading ? <Loading /> : <Leaderboard />}</Row>
  </Container>
);

export default App;
