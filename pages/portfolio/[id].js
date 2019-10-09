import axios from 'axios';

import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/BasePage';

function Portfolio(props) {

  const { post } = props;

  return (
    <BaseLayout>
      <BasePage>
        <h1>{post.title}</h1>
        <p>I am Portfolio page...</p>
      </BasePage>
    </BaseLayout>
  )
};

Portfolio.getInitialProps = async (context) => {
  const postId = context.query.id;
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.data;

  console.log(`Fetched post: ${post.id}`);

  return { post };
};

export default Portfolio;