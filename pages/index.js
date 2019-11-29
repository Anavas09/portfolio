import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Typed from 'react-typed';
import { useAuth0 } from "../react-auth0-spa";

import BaseLayout from '../components/layouts/BaseLayout';
import { useInterval } from '../utils';

function Index() {

  const [isFlipping, setIsFlipping] = useState(false);

  const { isAuthenticated, user } = useAuth0();

  const roles = ['Front End Developer', 'Tech Lover', 'ReactJS', 'NextJS']

  useInterval(() => {
    setIsFlipping(!isFlipping);
  }, 30000);

  return (
    <BaseLayout
      className={`cover ${isFlipping ? 'cover-1' : ''}`} headerType="index"
      title="Angel Navas - Portfolio"
    >
      <div className="main-section">
        <div className="background-image">
          <img alt="background image" src="/static/images/background-index.png" />
        </div>

        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                  <div className="front">
                    <div className="hero-section-content">
                      <h2> Front End Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img
                      alt="busy programming guy"
                      className="image"
                      src="/static/images/section-1.png"
                    />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Specialized in ReactJS </h2>
                      <div className="hero-section-content-intro">
                        Junior Web Developer.
                      </div>
                    </div>
                    <img
                      alt="orange busy programming guy"
                      className="image"
                      src="/static/images/section-2.png"
                    />
                    <div className="shadow-custom shadow-custom-2">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  {(isAuthenticated && user) && (
                    <span> <b>{user.name}</b> </span>
                    )
                  }
                  Welcome to the portfolio website of Angel Navas.
                  Get informed, collaborate(?) and discover projects I was working on through the years!
                </h1>
              </div>
              <Typed
                strings={roles}
                typeSpeed={40}
                backSpeed={50}
                backDelay={1000}
                loop
                className="self-typed"
              >
              </Typed>
              <div className="hero-welcome-bio">
                <h2>
                  Let's take a look on my work.
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
        <span className="service-link"> Vector Ilustration credit: {''}
          <a href="http://www.vecteezy.com" target="_blank" rel="noopener noreferrer">vecteezy.com</a>
        </span>
      </div>
    </BaseLayout>
  );
}

export default Index;