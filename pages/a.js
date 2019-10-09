import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

function A() {
  return (
    <BaseLayout>
      <BasePage className="A-page">
        <p>This is the A page</p>
      </BasePage>
    </BaseLayout>
  );
}

export default A;