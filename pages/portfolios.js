import { Fragment, useEffect, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { withRouter } from "next/router";
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';

import PortfolioCard from '../components/portofolios/PortfolioCard';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import {
  Button,
  Col,
  Row
} from 'reactstrap';

const namespace = 'http://localhost:3000';

function Portfolios(props) {

  const [portfolios, setPortfolios] = useState([])
  
  const { getTokenSilently, isAuthenticated, user } = useAuth0();

  const isSiteOwner = () => {
    if (user[`${namespace}/role`] === 'siteOwner'){
      return true;
    }else{
      return false;
    }
  }

  const deletePortfolio = async (portfolioId) => {
    if (isAuthenticated) {
      const url = `http://localhost:3000/api/v1/portfolios/${portfolioId}`;
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      axios.delete(url, { headers })
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'Your portfolio has been deleted.',
                  'success'
                ).then(() => props.router.reload())
              })
              .catch(err => {
                console.error(err);
                Swal.fire(
                  'Failed',
                  err.message,
                  'error'
                )
              });
    };
  }

  const navigateToEdit = (portfolioId, e) => {
    e.stopPropagation();
    props.router.push(`/portfolios/edit/${portfolioId}`)
  }

  const showDeleteWarning = (portfolioId, portfolioTitle, e) => {
    e.stopPropagation();
    Swal.fire({
      title: `Are you sure you want to delete ${portfolioTitle}?`,
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28A746',
      confirmButtonText: 'Yes, delete this portfolio!'
    }).then((result) => {
        if (result.value) {
          deletePortfolio(portfolioId);
        }
    })
  }

  useEffect(() => {
    const url = "http://localhost:3000/api/v1/portfolios";
    const fetchAPI = async () => {
      await axios.get(url)
              .then(res => {
                setPortfolios(res.data);
              })
              .catch(err => {
                console.error(err);
              });
    };
    fetchAPI();
  }, []);

  const renderPortfolios = (portfolios) => {
      return portfolios.map(portfolio => {
            return (
              <Col md="4" key={portfolio._id}>
                <PortfolioCard portfolio={portfolio}>
                  { isAuthenticated && isSiteOwner && (
                    <Fragment>
                      <Button
                        color="warning"
                        onClick={(e) => navigateToEdit(portfolio._id, e)}
                      >Edit
                      </Button>{' '}
                      <Button
                        color="danger"
                        onClick={(e) => showDeleteWarning(portfolio._id, portfolio.title, e)}
                      >Delete
                      </Button>
                    </Fragment>
                    )
                  }
                </PortfolioCard>
              </Col>
            )
          })
  }

  return (
    <BaseLayout>
      <BasePage className="portfolio-page" title="Portfolios">
        {isAuthenticated && isSiteOwner && (
          <Button
            className="add-port-btn"
            color="success"
            onClick={() => props.router.push('/portfolioNew')}
          >
            Add Portfolio
          </Button>
        )}
        <Row>
          {renderPortfolios(portfolios)}
        </Row>
      </BasePage>
    </BaseLayout>
  )
};

// Portfolios.getInitialProps = async () => {
//   const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
//   const portfolios = await res.data;

//   return { portfolios: portfolios.splice(0, 10) };
// };

export default withRouter(Portfolios);