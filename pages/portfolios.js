import { Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import Link from 'next/link';
import axios from 'axios';

import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row
} from 'reactstrap';

import BasePage from '../components/BasePage';

function Portfolios(props) {
  if(!props.portfolios) return <h1>verguer</h1>;

  const { portfolios } = props;

  return (
    <BaseLayout>
      <BasePage className="portfolio-page" title="Portfolios">
        <Row>
          {portfolios.map((portfolio, index) => {
            return (
              <Col md="4">
                <Fragment key={index}>
                  <span>
                    <Card className="portfolio-card">
                      <CardHeader className="portfolio-card-header">Some Position {index}</CardHeader>
                      <CardBody>
                        <p className="portfolio-card-city"> Some Location {index} </p>
                        <CardTitle className="portfolio-card-title">Some Company {index}</CardTitle>
                        <CardText className="portfolio-card-text">Some Description {index}</CardText>
                        <div className="readMore"> </div>
                      </CardBody>
                    </Card>
                  </span>
                </Fragment>
              </Col>
            )
          })}
        </Row>
      </BasePage>
    </BaseLayout>
  )
};

Portfolios.getInitialProps = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const portfolios = await res.data;

  return { portfolios: portfolios.splice(0, 10) };
};

export default Portfolios;