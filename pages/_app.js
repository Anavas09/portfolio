import React from 'react';
import App from 'next/app';
import { Auth0Provider } from "../react-auth0-spa";
import authConfig from "../auth_config.json";
//Styles
//Antd
import 'antd/dist/antd.css';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Static
import '../styles/main.scss';
import 'react-typed/dist/animatedCursor.css';

//FontAwesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import fontawesome from '../utils/fontawesome';

//FontsClientSide
import Fonts from '../utils/Fonts';

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

  // Load fonts on client side
  // componentDidMount() {
  //   Fonts()
  // }

  render() {

    /*const onRedirectCallback = appState => {
      history.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    };*/

    //ENV
    const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
    const BASE_URL = process.env.BASE_URL;
    
    const { Component, pageProps } = this.props; 

    return (
      <Auth0Provider
        domain={authConfig.domain}
        client_id={AUTH0_CLIENT_ID}
        redirect_uri={`${BASE_URL}/callback`}
        audience={authConfig.audience}
        scope='read:portfolios'
      >
        <Component {...pageProps} />
      </Auth0Provider>
    )
  }
}

export default MyApp