import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import hoistNonReactStatic from 'hoist-non-react-statics';

import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const namespace = process.env.NAMESPACE;

const useAuthentication = (role, Component) => props => {

  const { isAuthenticated, user } = useAuth0();

  let isAuthorized;

  const userRole = user && user[`${namespace}/role`]

  const renderComp = () => {
    if (role){
      if (userRole && userRole === role) { isAuthorized = true}
    }else{
      isAuthorized = false;
    }

    if (!isAuthenticated) {
      return (
        <BaseLayout>
          <BasePage>
            <h1>You are not authenticated. Please login to see this page.</h1>
          </BasePage>
        </BaseLayout>
      )
    }else if (!isAuthorized){
      return (
        <BaseLayout>
          <BasePage>
            <h1>You are not authorized. You dont have a permission to visit this page.</h1>
          </BasePage>
        </BaseLayout>
      )
    }else {
      return (<Component {...props} />)
    }
  }

  return hoistNonReactStatic(renderComp(), Component);
}

useAuthentication.getInitialProps = async (args) => {
  const pageProps = await Component.getInitialProps && await Component.getInitialProps(args)

  return { ...pageProps }
}

export default useAuthentication;