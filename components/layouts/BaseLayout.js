import Head from "next/head";
import Header from '../shared/Header/Header';

const BaseLayout = (props) => {
  const {children, className, title} = props;
  const headerType = props.headerType || 'default'

  return (
    <div className="layout-container" >
      <Head>
        <title>{title}</title>
        <meta name="description" content="Hi Everyone. My name is Angel Navas. I am an entry experience ReactJS frontend developer."/>
        <meta name="keywords" content="Angel Navas portafolio, Angel Navas React, Angel Navas ReactJS, Angel Navas FrontEnd, Angel Navas desarrollador"/>
        <meta property="og:title" content="Angel Navas - reactjs developer, developer, frontend developer, programmer"/>
        <meta property="og:locale" content="es_VE"/>
        <meta property="og:url" content={`${process.env.BASE_URL}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Hi Everyone. My name is Angel Navas. I am an entry experience ReactJS frontend developer."/>

        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
        <link rel="icon" type="image/ico" href="/static/favicon.ico"/>
        <link rel="manifest" href="/site.webmanifest"/>
        
      </Head>
      <Header className={`port-nav-${headerType}`} />
      <main className={`cover ${className}`}>
        <div className="wrapper">
          {children}
        </div>
      </main>
    </div>
    )
};

export default BaseLayout;