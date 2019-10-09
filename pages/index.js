import Link from 'next/link';
import { Col, Container, Row } from 'reactstrap';
import Typed from 'react-typed';
import { useAuth0 } from "../react-auth0-spa";

import BaseLayout from '../components/layouts/BaseLayout';

const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: 'Arial';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

function Index() {

  const { isAuthenticated, user } = useAuth0();

  const roles = ['Front End Developer', 'Tech Lover', 'Alexa is better than Siri', 'React.js']

  return (
    <BaseLayout className="cover" headerType="index">
      <div className="main-section">
        <div className="background-image">
          <img src="/static/images/background-index.png" />
        </div>

        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper`}>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Front End Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img className="image" src="/static/images/section-1.png"/>
                    <div className="shadow-custom">
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
                <h1>
                  Let's take a look on my work.
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
}

export default Index;