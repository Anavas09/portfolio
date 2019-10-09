import { useEffect } from "react";
import { withRouter } from "next/router";

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

function CallBack(props) {

  useEffect(() => {
    props.router.push('/')
  })

  return (
    <BaseLayout>
      <BasePage>
        <p>VERIFYING DATA ...</p>
      </BasePage>
    </BaseLayout>
  )
};

export default withRouter(CallBack);