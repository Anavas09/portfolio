import { Fragment } from 'react';
import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

function Header(){
  return (
    <Fragment>
      <Link href="/">
        <a style={linkStyle} title="Home Page">Home Page</a>
      </Link>
      <Link href="/portfolios">
        <a style={linkStyle} title="Portfolios Page">Portfolios Page</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle} title="About Page">About Page</a>
      </Link>
      <Link href="/blogs">
        <a style={linkStyle} title="Blogs Page">Blogs Page</a>
      </Link>
      <Link href="/cv">
        <a style={linkStyle} title="CV Page">CV Page</a>
      </Link>
    </Fragment>
  )
};

export default Header;