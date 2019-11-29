import React from 'react';

import {
  Col,
  Row
} from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

function CV() {

  return (
    <BaseLayout title="Angel Navas - My CV">
      <BasePage className="cv-page" title="Get My CV">
        <Row>
          <Col md={{size: 8, offset: 2}}>
            <div className="cv-title">
              <a
                download="angel_navas-CV.pdf"
                href="/static/angel_navas_CV.pdf"
                className="btn btn-success"
              >
                Download
              </a>
            </div>
            <iframe
              style={{width: '100%', height: '800px'}}
              src="/static/angel_navas_CV.pdf"></iframe>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
};

export default CV;