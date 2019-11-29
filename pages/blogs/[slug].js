import React from 'react';
import { withRouter } from "next/router";

import {
  Col,
  Container,
  Row
} from 'reactstrap';

import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/BasePage';
import { getBlogBySlug } from '../../actions';

function BlogDetail(props) {
  const { blog } = props;

  return (
    <BaseLayout title="Blog Details">
      <BasePage className="blog-detail-page">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div dangerouslySetInnerHTML={{__html: blog.story}}></div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

BlogDetail.getInitialProps = async ({query}) => {
  const { slug } = query;
  let res = {};
  try {
    res = await getBlogBySlug(slug);
  } catch(err){
    console.error(err);
  }

  return { blog: res }
}

export default withRouter(BlogDetail);