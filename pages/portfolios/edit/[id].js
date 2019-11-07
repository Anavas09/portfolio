import { useEffect, useState } from 'react';
import { withRouter } from "next/router";
import { useAuth0 } from '../../../react-auth0-spa';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

import BaseLayout from '../../../components/layouts/BaseLayout';
import BasePage from '../../../components/BasePage';
import CreatePortfolioForm from '../../../components/portofolios/CreatePortfolioForm';

import useAuthentication from '../../../components/hoc/withAuth';

function portfolioEdit(props) {
  const { id } = props.router.query

  const { getTokenSilently, isAuthenticated } = useAuth0();
  
  const [error, setError] = useState(undefined)
  const [portfolio, setPortfolio] = useState(null);

  const rejectPromise = (resError) => {
    let error = {};

    if (resError && resError.response && resError.response.data){
      error = resError.response.data;
    }else {
      error = resError;
    }
    setError(error.message)
    return Promise.reject(error)
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (isAuthenticated) {
      const url = `http://localhost:3000/api/v1/portfolios/${id}`;
      const fetchAPI = async () => {
        const token = await getTokenSilently();
        const headers = { 'Authorization': `Bearer ${token}` };
        await axios.get(url, {cancelToken: source.token}, { headers })
                .then(res => {
                  setPortfolio(res.data);
                })
                .catch(err => {
                  console.error(err);
                });
      };
      fetchAPI();
      return () => {
        source.cancel();
      };
    }
  }, [getTokenSilently, isAuthenticated]);

  const updatePortfolio = async (portfolioData, {setSubmitting}) => {
    const url = `http://localhost:3000/api/v1/portfolios/${id}`;
    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      setSubmitting(true)
      await axios.patch(url, portfolioData, {headers})
              .then(res => {
                if(res.status === 200){
                  Swal.fire(
                    'Updated',
                    'Portfolio data was successfuly updated',
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
      <BasePage className="portfolio-create-page" title="Update Portfolio">
        <Row>
          <Col md="6">
            <CreatePortfolioForm
              action={'Update'}
              error={error}
              initialValues={portfolio}
              handleSubmit={updatePortfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', withRouter(portfolioEdit));