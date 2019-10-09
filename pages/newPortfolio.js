import { Col, Row } from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import CreatePortfolioForm from '../components/portofolios/CreatePortfolioForm';

import useAuthentication from '../components/hoc/withAuth';

function NewPortfolio() {

  const savePortfolio = (portfolioData) => {
    alert(JSON.stringify(portfolioData, null, 2));
  }

  return (
    <BaseLayout>
      <BasePage className="portfolio-create-page" title="Create New Portfolio">
        <Row>
          <Col md="6">
            <CreatePortfolioForm savePortfolio={savePortfolio}/>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', NewPortfolio);