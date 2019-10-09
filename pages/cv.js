import { useAuth0 } from "../react-auth0-spa";

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

function CV() {
  
  const { isAuthenticated } = useAuth0();

  if ( !isAuthenticated ) {
    return (
      <BaseLayout>
        <BasePage>
          <p>You need login to see this page!</p>
        </BasePage>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <BasePage>
        <p>I am CV page...</p>
      </BasePage>
    </BaseLayout>
  )
};

export default CV;