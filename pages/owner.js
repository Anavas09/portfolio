import axios from 'axios';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import useAuthentication from '../components/hoc/withAuth';

function Owner(props) {

  debugger;

  const { portfolios } = props;
  return (
    <BaseLayout>
      <BasePage>
        <h1>I am the Owner page!</h1>
      </BasePage>
    </BaseLayout>
  )
}

Owner.getInitialProps = async () => {
  debugger;
  let portfoliosx;
  await axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      portfoliosx = res.data
    })

  return { portfolios: portfoliosx.splice(0, 10) };
};

export default useAuthentication(Owner, 'siteOwner');