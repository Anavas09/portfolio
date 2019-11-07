import { Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import Link from 'next/link';

import {
  Col,
  Container,
  Row
} from 'reactstrap';

import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BasePage from '../components/BasePage';

function Blogs() {
  return (
    <BaseLayout headerType={'landing'} className="blog-listing-page">
      <div className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
        <div className="overlay"></div>
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Fresh Blogs</h1>
                <span className="subheading">Programming, travelling...</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-body">
        <Row>
          <Col md="10" lg="8" className="mx-auto">
            {
              <Fragment>
              <div  className="post-preview">
                <Link route={`/blogs/blogId`}>
                  <a>
                    <h2 className="post-title">
                      Very Nice Blog Post
                    </h2>
                    <h3 className="post-subtitle">
                      How I Start Porgramming...
                    </h3>
                  </a>
                </Link>
                <p className="post-meta">Posted by
                  <a href="#"> Angel Navas </a>
                  {format(new Date(), "EEEE, MMMM dd, yyyy h:mm aaaaaa")}</p>
              </div>
              <hr></hr>
              <div  className="post-preview">
                <Link route={`/blogs/blogId`}>
                  <a>
                    <h2 className="post-title">
                      Very Nice Blog Post
                    </h2>
                    <h3 className="post-subtitle">
                      How I Start Porgramming...
                    </h3>
                  </a>
                </Link>
                <p className="post-meta">Posted by
                  <a href="#"> Angel Navas </a>
                  {format(new Date(), "EEEE, MMMM dd, yyyy h:mm aaaaaa")}</p>
              </div>
              <hr></hr>
              <div  className="post-preview">
                <Link route={`/blogs/blogId`}>
                  <a>
                    <h2 className="post-title">
                      Very Nice Blog Post
                    </h2>
                    <h3 className="post-subtitle">
                      How I Start Porgramming...
                    </h3>
                  </a>
                </Link>
                <p className="post-meta">Posted by
                  <a href="#"> Angel Navas </a>
                  {format(new Date(), "EEEE, MMMM dd, yyyy h:mm aaaaaa")}</p>
              </div>
              <hr></hr>
            </Fragment>
            }
            <div className="clearfix">
              <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
            </div>
          </Col>
        </Row>

        <footer>
          <Container>
            <Row>
              <div className="col-lg-8 col-md-10 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="fa-stack fa-lg">
                        <FontAwesomeIcon icon="circle" className="fa-stack-2x"/>
                        <FontAwesomeIcon icon={['fab', 'twitter']} inverse className="fa-stack-1x"/>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="fa-stack fa-lg">
                        <FontAwesomeIcon icon="circle" className="fa-stack-2x"/>
                        <FontAwesomeIcon icon={['fab', 'facebook']} inverse className="fa-stack-1x"/>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="fa-stack fa-lg">
                        <FontAwesomeIcon icon="circle" className="fa-stack-2x"/>
                        <FontAwesomeIcon icon={['fab', 'github']} inverse className="fa-stack-1x"/>
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="copyright text-muted">Copyright &copy; Angel Navas 2019</p>
              </div>
            </Row>
          </Container>
        </footer>
      </BasePage>
    </BaseLayout>
  );
}

export default Blogs;