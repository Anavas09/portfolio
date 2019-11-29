import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const namespace = process.env.NAMESPACE;

//const { isAuthenticated, user } = useAuth0()

export default function(role) {
  return function(Component) {
    return class withAuthentication extends React.Component {


      static async getInitialProps(args) {
        const pageProps = await Component.getInitialProps && await Component.getInitialProps(args)
      
        return { ...pageProps }
      }

      renderProtectedPage(){
        const isAuthenticated = true;
        const user = {
          'http://localhost:3000/role': 'siteOwner'
        }
    
        const userRole = user && user[`${namespace}/role`]
    
        let isAuthorized = false;
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
          return (<Component {...this.props} />)
        }
      }

      render(){
        
        return this.renderProtectedPage()
      }
    }
  }
}