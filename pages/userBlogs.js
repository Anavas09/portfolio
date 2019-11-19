import React, { useEffect, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { withRouter } from "next/router";
import Swal from 'sweetalert2';
import axios from 'axios';
import Link from 'next/link';

import {
  Button,
  Col,
  Container,
  Row
} from 'reactstrap';

import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import useAuthentication from '../components/hoc/withAuth';
import { deleteBlog, getUserBlogs, updateBlog} from '../actions';
import PortButtonDropdown from '../components/PortButtonDropdown';

function UserBlogs(props) {
  
  const [error, setError] = useState(undefined);

  const [blogs, setBlogs] = useState([]);
  
  const { getTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const fetchAPI = async () => {
        const token = await getTokenSilently();
        const headers = { 'Authorization': `Bearer ${token}` };
        const blogs = await getUserBlogs(headers);
        setBlogs(blogs);
      };

      try {
        fetchAPI();
      } catch (error) {
        setError(err)
        rejectPromise(err)
      }

      return () => {
        source.cancel();
      };
    }
  }, [getTokenSilently, isAuthenticated]);

  const navigateToEdit = (blogId, e) => {
    e.stopPropagation();
    props.router.push(`/blogs/edit/${blogId}`)
  }

  const createStatus = (status) => {
    return status === 'draft' ? {view:'Publish Story',value:'published'}
                              : {view:'Make a Draft',value:'draft'}
  }

  const updateBlogStatus = async (blogId, status) => {

    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      debugger;
      updateBlog(blogId, {status}, headers)
        .then(res => {
          debugger;
          if(res.status === 200){
            Swal.fire(
              'Updated',
              'Blog Status was successfuly updated',
              'success'
            ).then(() => props.router.push(`/userBlogs`));
          }
        })
        .catch(err => {
          console.error(err)
          Swal.fire(
            'Failed',
            err.message,
            'error'
          )
        });
    }
  }

  const updateModal = (blogId, status) => {
    Swal.fire({
      title: `You want to ${status} this Blog?`,
      type: 'question',
      confirmButtonText: status === 'draft' ? 'Published' : 'Draft',
      confirmButtonColor: '#28a745',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      showCloseButton: true
    }).then((result) => {
      if (result.value) {
        updateBlogStatus(blogId, status);
      }
    })
  }

  const changeBlogStatus = (blogId, status) => {
    updateModal(blogId, status)
  }

  const deleteThisBlog = async (blogId) => {
    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      return deleteBlog(blogId, headers)
    };
  }

  const showDeleteWarning = (blogId, blogTitle, e) => {
    e.stopPropagation();
    Swal.fire({
      title: `Are you sure you want to delete ${blogTitle}?`,
      text: "You won't be able to revert this!",
      type: 'question',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28A746',
      confirmButtonText: 'Yes, delete this blog!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return deleteThisBlog(blogId)
          .then(res => {
            Swal.fire(
              res,
              'Your blog has been deleted.',
              'success'
            ).then(() => props.router.push('/userBlogs'))
          })
          .catch(err => {
            Swal.showValidationMessage(
              `Request failed: ${err}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your blog has been deleted.',
          'success'
        ).then(() => props.router.push('/userBlogs'))
      }
    })
  }

  const dropdownOptions = (blog) => {
    const blogStatus = createStatus(blog.status);

    return [
      { text: blogStatus.view, handlers: {onClick: () => changeBlogStatus(blog._id, blogStatus.value)}},
      { text: 'Delete', handlers: {onClick: (e) => showDeleteWarning(blog._id, blog.title, e)}}
    ]
  }

  const separateBlogs = (blogs) => {
    const drafts = [];
    const published = [];

    blogs.map(blog => {
      return blog.status === 'draft' ? drafts.push(blog) : published.push(blog)
    })

    return {drafts, published}
  }

  const renderBlogs = (blogs) => {
    return (
      <ul className="user-blog-list">
      {
        blogs.map((blog, i) => {
          return (
            <li key={i}>
              <Link href={`/blogs/edit/${blog._id}`}>
                <a>{blog.title}</a>
              </Link>
              <PortButtonDropdown items={dropdownOptions(blog)}/>
            </li>
          )
        })
      }
      </ul>
    )
  }

  const { drafts, published } = separateBlogs(blogs);

  return (
    <BaseLayout headerType={'landing'}>
      <div className="masthead" style={{backgroundImage: "url('/static/images/home-bg.jpg')"}}>
        <div className="overlay"></div>
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Blogs Dashboard</h1>
                <span className="subheading">
                  Let's write some nice blog{' '}
                  <Link href={'/blogEditor'} as='/blogs/new'>
                    <a><Button color="primary">Create a new blog</Button></a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title">Published Blogs</h2>
            {renderBlogs(published)}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title">Drafts Blogs</h2>
            {renderBlogs(drafts)}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', withRouter(UserBlogs));