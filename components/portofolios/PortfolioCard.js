import React, { useState } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle
} from 'reactstrap';
import PortfolioCardDetail from './PortfolioCardDetail';

function PortfolioCard(props) {

  const { portfolio, children } = props;

  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => setOpenModal(!openModal);

  return (
    <span onClick={() => handleToggle()}>
      <PortfolioCardDetail
        openModal={openModal}
        portfolio={portfolio}
        toggle={() => handleToggle()}
      />
      <Card className="portfolio-card">
        <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
        <CardBody>
          <p className="portfolio-card-city">{portfolio.location} </p>
          <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
          <CardText className="portfolio-card-text">{portfolio.description}</CardText>
          <div className="readMore"> </div>
          {children}
        </CardBody>
      </Card>
    </span>
  );
};

export default PortfolioCard;