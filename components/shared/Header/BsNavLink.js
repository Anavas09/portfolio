import React from 'react';

import PropTypes from 'prop-types';
import ActiveLink from '../../ActiveLink';

function BsNavLink(props) {

  const { route, title} = props;
  const className = props.className || "";

  return (
    <ActiveLink activeClassName="active" href={route}>
      <a className={`nav-link port-navbar-link ${className}`} title={title}>{title}</a>
    </ActiveLink>
  );
};

BsNavLink.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BsNavLink;