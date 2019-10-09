import React from 'react';

import { useAuth0 } from "../../../react-auth0-spa";

function Logout(){
  
  const { logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
      <span onClick={() => logoutWithRedirect()} className="nav-link port-navbar-link clickable"> Logout </span>
  ); 
};

export default Logout;