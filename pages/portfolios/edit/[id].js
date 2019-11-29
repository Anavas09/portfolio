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
import { getPortfolioById, updatePortfolio } from '../../../actions';

function portfolioEdit(props) {
  const { id } = props.router.query

  const { getTokenSilently, isAuthenticated } = useAuth0();
  
  const [error, setError] = useState(undefined)
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (isAuthenticated) {
      const fetchAPI = async () => {
        const token = await getTokenSilently();
        const headers = { 'Authorization': `Bearer ${token}` };
        const portfolio = await getPortfolioById(id, headers);
        setPortfolio(portfolio);
      };

      try {
        fetchAPI();
      } catch (err) {
        setError(err)
        setBlog({})
        console.error(error)
      }

      return () => {
        source.cancel();
      };
    }
  }, [getTokenSilently, isAuthenticated]);

  const updateThisPortfolio = async (portfolioData, {setSubmitting}) => {
    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      setSubmitting(true)
      await updatePortfolio(id, portfolioData, headers)
              .then(res => {
                if(res.status === 200){
                  Swal.fire(
                    'Updated',
                    'Portfolio data was successfuly updated',
                    'success'
                  ).then(()=> props.router.push('/portfolios'))
                }
              })
              .catch(err => {
                setSubmitting(false)
                Swal.fire(
                  'Failed',
                  err.message,
                  'error'
                )
              });
    }
  };

  return (
    <BaseLayout title="Edit Portfolio">
      <BasePage className="portfolio-create-page" title="Update Portfolio">
        <Row>
          <Col md="6">
            <CreatePortfolioForm
              action={'Update'}
              error={error}
              initialValues={portfolio}
              handleSubmit={updateThisPortfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', withRouter(portfolioEdit));