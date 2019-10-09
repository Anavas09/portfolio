import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

function B() {
  return (
    <BaseLayout>
      <BasePage className="B-page">
        <p>This is the B page</p>
      </BasePage>
    </BaseLayout>
  );
}

export default B;