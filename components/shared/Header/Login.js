import React from 'react';

import { useAuth0 } from "../../../react-auth0-spa";

function Login(){

  const { loginWithPopup } = useAuth0();

  return (
      <span
        onClick={() => loginWithPopup({})}
        className="nav-link port-navbar-link clickable"
      >
        Login
      </span>
  );
};

export default Login;