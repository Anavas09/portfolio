import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import axios from 'axios';

function Portfolios(props) {
  if(!props.portfolios) return;

  const { portfolios } = props;

  return (
    <Layout>
      <p>I am Portfolios page...</p>
      <ul>
        {portfolios.map(portfolio => {
          return (
            <li key={portfolio.id}>
            <Link href={"/portfolio/[id]"} as={`/portfolio/${portfolio.id}`}>
              <a style={{"fontSize" : "20px"}} title={`Portfolio-${portfolio.id}`}>{portfolio.title}</a>
            </Link>
            <style jsx>{`
              li {
                list-style: none;
                margin: 5px 0;
              }

              a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
              }

              a:hover {
                opacity: 0.6;
              }
            `}</style>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
};

Portfolios.getInitialProps = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const portfolios = await res.data;

  return { portfolios: portfolios.splice(0, 10) };
};

export default Portfolios;