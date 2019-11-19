import { Fragment, useEffect, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { withRouter } from "next/router";
import Link from 'next/link';
import Swal from 'sweetalert2';

import PortfolioCard from '../components/portofolios/PortfolioCard';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import {
  Button,
  Col,
  Row
} from 'reactstrap';
import { deletePortfolio, getPortfolios } from '../actions';

const namespace = 'http://localhost:3000';

function Portfolios(props) {

  //const [portfolios, setPortfolios] = useState([])
  
  const { getTokenSilently, isAuthenticated, user } = useAuth0();

  const isSiteOwner = () => {
    if (user[`${namespace}/role`] === 'siteOwner'){
      return true;
    }else{
      return false;
    }
  }

  const deleteThisPortfolio = async (portfolioId) => {
    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      deletePortfolio(portfolioId, headers)
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'Your portfolio has been deleted.',
                  'success'
                ).then(() => props.router.push('/portfolios'))
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
      type: 'question',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28A746',
      confirmButtonText: 'Yes, delete this portfolio!'
    }).then((result) => {
        if (result.value) {
          deleteThisPortfolio(portfolioId);
        }
    })
  }

  useEffect(() => {
    const fetchAPI = async () => {
      await getPortfolios()
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
    return portfolios.length > 0 && (
      portfolios.map(portfolio => {
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
          }))
  }

  const { portfolios } = props

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

Portfolios.getInitialProps = async () => {
  let portfolios = {};
  try {
    portfolios = await getPortfolios();
  } catch(err){
    console.error(err);
  }

  return { portfolios: portfolios }
}

export default withRouter(Portfolios);