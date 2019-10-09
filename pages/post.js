import { useRouter } from 'next/router';
import BaseLayout from '../components/layouts/BaseLayout';

const Page = () => {
  const router = useRouter();

  return (
    <BaseLayout>
      <BasePage>
        <h1>{router.query.title}</h1>
        <p>This is the blog post content.</p>
      </BasePage>
    </BaseLayout>
  );
};

export default Page;