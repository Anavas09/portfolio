import React from 'react';
import App from 'next/app';
import { Auth0Provider } from "../react-auth0-spa";
import config from "../auth_config.json";
//Styles
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Static
import '../styles/main.scss';
import 'react-typed/dist/animatedCursor.css';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  //static async getInitialProps({Component, ctx}) {
  //  debugger;
  //  let pagePropsx = {};
  //  if (Component.getInitialProps){
  //    // calls page's `getInitialProps` and fills //`appProps.pageProps`
  //    pagePropsx = await Component.getInitialProps(ctx);
  //  }
  //  
  //
  //  return { pagePropsx }
  //}

  render() {

    /*const onRedirectCallback = appState => {
      history.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    };*/
    
    const { Component, pageProps } = this.props
    return (
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={config.callbackUrl}
        audience={config.audience}
        scope='read:portfolios'
      >
        <Component {...pageProps} />
      </Auth0Provider>
    )
  }
}

export default MyApp