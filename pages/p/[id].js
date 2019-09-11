import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import axios from 'axios';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
);

Post.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.data;

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;