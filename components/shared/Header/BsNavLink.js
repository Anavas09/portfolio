import React from 'react';
import Link from 'next/link';

import PropTypes from 'prop-types';

function BsNavLink(props) {

  const { route, title} = props;

  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link" title={title}>{title}</a>
    </Link>
  );
};

BsNavLink.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BsNavLink;