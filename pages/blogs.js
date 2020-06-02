import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import {
  Col,
  Container,
  Row
} from 'reactstrap';

import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import BlogsSk from '../components/layouts/BlogsSk';
import BlogsSpinner from '../components/layouts/BlogsSpinner';
import { getBlogs } from '../actions';
import { shortenText } from '../utils';

function Blogs() {
  
  const [error, setError] = useState(undefined);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchAPI = async () => {
      const blogs = await getBlogs();
      setBlogs(blogs);
    };

    try {
      fetchAPI();
    } catch (err) {
      setError(err)
      console.error(error)
    }

    return () => {
      source.cancel();
    };
  }, []);

  const renderBlogs = (blogs) => {

    return (
      !blogs.length > 0 ?
        <BlogsSk />
        :
        blogs.map((blog, i) => {
          return (
            <Fragment key={i}>
              <div key={i} className="post-preview">
                <Link href={`/blogs/${blog.slug}`}>
                  <a>
                    <h2 className="post-title">
                      {blog.title}
                    </h2>
                    <h3 className="post-subtitle">
                      {shortenText(blog.subTitle)}
                    </h3>
                  </a>
                </Link>
                <p className="post-meta">Posted by
                  <a href="#"> {blog.author} </a>
                  {format(new Date(blog.updatedAt), "EEEE, MMMM dd, yyyy h:mm aaaaaa")}</p>
              </div>
              <hr></hr>
            </Fragment>
          )
        })
    )
  }

  return (
    <BaseLayout
      headerType={'landing'}
      className="blog-listing-page"
      title="Angel Navas - My Blogs"
    >
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
              renderBlogs(blogs)
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
                    <a href="https://github.com/Anavas09" target="_blank" rel="noopener noreferrer">
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