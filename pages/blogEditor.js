import React, { useState } from 'react';
import { withRouter } from "next/router";
import { useAuth0 } from '../react-auth0-spa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { createBlog, rejectPromise } from '../actions'

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import useAuthentication from '../components/hoc/withAuth';
import SlateEditor from '../components/slate-editor/SlateEditor';

function BlogEditor(props) {

  const [isSaving, setIsSaving] = useState(false)
  const [lockId] = useState(Math.floor(1000 + Math.random() * 9000))
  
  const { getTokenSilently, isAuthenticated } = useAuth0();

  const saveBlog = async (story, heading) => {

    const blog = {};
    blog.title = heading.title;
    blog.subTitle = heading.subTitle;
    blog.story = story;

    if (isAuthenticated) {
      //const url = "http://localhost:3000/api/v1/blogs";
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      setIsSaving(true);
      // axios.post(url, blog, {headers})
      //         .then(res => {
      //           if(res.status === 200){
      //             setIsSaving(false);
      //             Swal.fire(
      //               'Added',
      //               'New blog successfuly added',
      //               'success'
      //             )
      //           }
      //         })
      //         .catch(err => {
      //           setIsSaving(false);
      //           rejectPromise(err)
      //           Swal.fire(
      //             'Failed',
      //             err.message,
      //             'error'
      //           )
      //         });
      createBlog(blog, headers, lockId)
        .then(res => {
          if(res.status === 200){
            // toast.success('Blog successfuly updated',{
            //   position: toast.POSITION.TOP_RIGHT,
            //   onClose: () => props.router.reload()
            // })
            setIsSaving(false);
            Swal.fire(
              'Added',
              'New blog successfuly added',
              'success'
            ).then(() => props.router.push(`/blogs/edit/${res.data._id}`))
          }
        })
        .catch(err => {
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
      title: 'Add New Blog?',
      type: 'question',
      confirmButtonText: 'Add New Blog',
      confirmButtonColor: '#28a745',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      showCloseButton: true
    }).then((result) => {
      if (result.value) {
        saveBlog(story, heading);
      }
    })
  }

  return (
    <BaseLayout title="Blog Editor">
      <BasePage containerClass={"editor-wrapper"} className="blog-editor-page">
        <SlateEditor
          isnew={true}
          isloadingdata={isSaving ? true : false}
          saveblog={saveModal}/>
      </BasePage>
    </BaseLayout>
  );
}

export default useAuthentication('siteOwner', withRouter(BlogEditor));