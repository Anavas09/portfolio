import Head from "next/head";
import Header from '../shared/Header/Header';

const BaseLayout = (props) => {
  const {children, className} = props;
  const headerType = props.headerType || 'default'

  return (
    <div className="layout-container" >
      <Head>
        <title>Portfolio</title>
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