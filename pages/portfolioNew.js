import { useState } from 'react';
import { withRouter } from "next/router";
import { useAuth0 } from '../react-auth0-spa';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import CreatePortfolioForm from '../components/portofolios/CreatePortfolioForm';

import useAuthentication from '../components/hoc/withAuth';

const INITIAL_VALUES = {
  title: undefined,
  company: '',
  location: '',
  position: '',
  description: '', //TextArea
  startDate: new Date(), //Date
  endDate: new Date() //Date
}

function portfolioNew(props) {

  const [error, setError] = useState(undefined)
  
  const { getTokenSilently, isAuthenticated } = useAuth0();

  const rejectPromise = (resError) => {
    let error = {};

    if (resError && resError.response && resError.response.data){
      error = resError.response.data;
    }else {
      error = resError;
    }
    setError(error)
    return Promise.reject(error)
  }

  const createPortfolio = async (portfolioData, {setSubmitting}) => {
    const url = "http://localhost:3000/api/v1/portfolios";
    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      setSubmitting(true)
      await axios.post(url, portfolioData, {headers})
              .then(res => {
                if(res.status === 200){
                  Swal.fire(
                    'Added',
                    'New portfolio successfuly added',
                    'success'
                  )
                }
              }).then(()=> props.router.push('/portfolios'))
              .catch(err => {
                setSubmitting(false)
                rejectPromise(err)
                Swal.fire(
                  'Failed',
                  err.message,
                  'error'
                )
              });
    }
  };

  return (
    <BaseLayout>
      <BasePage className="portfolio-create-page" title="Create New Portfolio">
        <Row>
          <Col md="6">
            <CreatePortfolioForm
              action={'Create'}
              error={error}
              initialValues={INITIAL_VALUES}
              handleSubmit={createPortfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', withRouter(portfolioNew));