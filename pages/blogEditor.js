import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import useAuthentication from '../components/hoc/withAuth';
import SlateEditor from '../components/slate-editor/SlateEditor';

function BlogEditor() {
  return (
    <BaseLayout>
      <BasePage containerClass={"editor-wrapper"} className="blog-editor-page" title="Write Your Story...">
        <SlateEditor />
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', BlogEditor);