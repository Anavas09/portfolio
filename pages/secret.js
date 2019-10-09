import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import useMousePosition from '../components/hoc/withMouse';

import useAuthentication from '../components/hoc/withAuth';

function Secret() {
  const { x, y } = useMousePosition();

  return (
    <BaseLayout>
      <BasePage>
        <p>I am Secret page...</p>
        <p>The current mouse position is ({x}, {y})</p>
      </BasePage>
    </BaseLayout>
  );
}

/*Secret.getInitialProps = async () => {
  const res = await axios.get('http://localhost:3000/secretdata');
  const restaurant = await res.data;

  return { restaurant };
};*/

export default useAuthentication('siteOwner', Secret);