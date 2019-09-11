import {Link} from '../routes';
import Layout from '../components/layouts/Layout';

function Test(props) {

  return (
    <Layout>
      <p>I am Test page... {props.testId}</p>
      <Link route='test' params={{id: '1'}}>
      <a>Hello world</a>
      </Link>
      {/*or*/}
      <Link route='/test/2'>
      <a>Hello world</a>
      </Link>
    </Layout>
  )
};

Test.getInitialProps = async ({query}) => {
  const testId = query.id;

  return { testId };
};

export default Test;