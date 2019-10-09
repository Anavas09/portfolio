import axios from 'axios';

import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/BasePage';

const Post = props => (
  <BaseLayout>
    <BasePage>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
      <img src={props.show.image.medium} />
    </BasePage>
  </BaseLayout>
);

Post.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.data;

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;