import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuthentication from '../components/hoc/withOther';

class Ownerx extends React.Component {

  static getInitialProps() {
    const superSecretValue = 'Secret Value'
  
    return { superSecretValue };
  };

  render(){
    
    return (
      <BaseLayout>
        <BasePage>
          <h1>I am the Ownerx page!</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuthentication('siteOwner')(Ownerx);