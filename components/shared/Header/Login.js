import React from 'react';
import Swal from 'sweetalert2';

import { useAuth0 } from "../../../react-auth0-spa";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

function Login(){

  const { loginWithPopup } = useAuth0();
  
  const loginToast = () => {
    Toast.fire({
      type: 'success',
      title: 'Login successfully',
      background: '#17a2b8'
    })
  }
  
  const errorToast = () => {
    Toast.fire({
      type: 'error',
      title: 'Something wrong',
      background: '#dc3545'
    })
  }

  return (
      <span
        onClick={() => loginWithPopup({})
                        .then(res => {
                            console.log(res)
                            loginToast()
                          })
                        .catch(() => errorToast())
                      }
        className="nav-link port-navbar-link clickable"
      >
        Login
      </span>
  );
};

export default Login;