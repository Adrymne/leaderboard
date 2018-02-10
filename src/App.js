import React from 'react';
import { connect } from 'react-redux';
import { applySpec } from 'ramda';
import { isDataInActiveList } from 'store/selectors';
import { Container, Row, Col } from 'reactstrap';
import FilterOptions from './app/FilterOptions';
import Loading from './app/Loading';
import Leaderboard from './app/Leaderboard';
import './App.css';

const App = ({ isDataInActiveList }) => (
  <Container fluid id="app-container">
    <Row className="header">
      <Col>
        <FilterOptions />
      </Col>
    </Row>
    <Row className="body">
      {isDataInActiveList ? <Leaderboard /> : <Loading />}
    </Row>
  </Container>
);

const mapStateToProps = applySpec({ isDataInActiveList });
export default connect(mapStateToProps)(App);
