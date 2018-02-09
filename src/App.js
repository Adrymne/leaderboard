import React from 'react';
import { connect } from 'react-redux';
import { applySpec } from 'ramda';
import { isLoadedData } from 'store/selectors';
import { Container, Row, Col } from 'reactstrap';
import FilterOptions from './app/FilterOptions';
import Loading from './app/Loading';
import Leaderboard from './app/Leaderboard';
import './App.css';

const App = ({ isLoadedData }) => (
  <Container fluid id="app-container">
    <Row className="header">
      <Col>
        <FilterOptions />
      </Col>
    </Row>
    <Row className="body">{isLoadedData ? <Leaderboard /> : <Loading />}</Row>
  </Container>
);

const mapStateToProps = applySpec({ isLoadedData });
export default connect(mapStateToProps)(App);
