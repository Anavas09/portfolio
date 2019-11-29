import React, { useEffect, useState } from 'react';
import { withRouter } from "next/router";
import { useAuth0 } from '../../../react-auth0-spa';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getBlogById, updateBlog } from '../../../actions'

import BaseLayout from '../../../components/layouts/BaseLayout';
import BasePage from '../../../components/BasePage';

import useAuthentication from '../../../components/hoc/withAuth';
import SlateEditor from '../../../components/slate-editor/SlateEditor';
import BlogEditSpinner from '../../../components/layouts/BlogEditSpinner';

function BlogEditorUpdate(props) {
  const { id } = props.router.query;

  const [isSaving, setIsSaving] = useState(false);
  
  const [error, setError] = useState(undefined);

  const [blog, setBlog] = useState(null);
  
  const { getTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const fetchAPI = async () => {
        const token = await getTokenSilently();
        const headers = { 'Authorization': `Bearer ${token}` };
        const blog = await getBlogById(id, headers);
        setBlog(blog);
      };

      try {
        fetchAPI();
      } catch (err) {
        setError(err)
        setBlog({})
        console.error(error)
      }

      return () => {
        source.cancel();
      };
    }
  }, [getTokenSilently, isAuthenticated]);

  /**
   * Update the blog data
   * 
   * @param {String} story 
   * @param {Object} heading 
   */

  const updateBlogData = async (story, heading) => {

    const editedBlog = {};
    editedBlog.title = heading.title;
    editedBlog.subTitle = heading.subTitle;
    editedBlog.story = story;

    if (isAuthenticated) {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      setIsSaving(true);
      debugger;
      updateBlog(id, editedBlog, headers)
        .then(res => {
          debugger;
          if(res.status === 200){
            // toast.success('Blog successfuly updated',{
            //   position: toast.POSITION.TOP_RIGHT,
            //   onClose: () => props.router.reload()
            // })
            setIsSaving(false);
            Swal.fire(
              'Updated',
              'Blog data was successfuly updated',
              'success'
            ).then(() => props.router.reload());
          }
        })
        .catch(err => {
          // toast.error(`Failed: ${err.message}`,{
          //   position: toast.POSITION.BOTTOM_CENTER
          // })
          console.error(err)
          setIsSaving(false)
          Swal.fire(
            'Failed',
            err.message,
            'error'
          )
        });
    }
  }

  const saveModal = (story, heading) => {
    Swal.fire({
      title: 'You want to updated this Blog?',
      type: 'question',
      confirmButtonText: 'Update!',
      confirmButtonColor: '#28a745',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      showCloseButton: true
    }).then((result) => {
      if (result.value) {
        updateBlogData(story, heading);
      }
    })
  }

  return (
    <BaseLayout title="Edit Blog">
      <BasePage containerClass={"editor-wrapper"} className="blog-editor-page">
        { !blog ?
          <BlogEditSpinner /> 
          :
          <SlateEditor
            initialValue={blog.story}
            isloadingdata={isSaving ? true : false}
            saveblog={saveModal}
          />
        }
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', withRouter(BlogEditorUpdate));