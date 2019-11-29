import React, { Children } from 'react';
import { withRouter } from "next/router";
import Link from 'next/link';

function ActiveLink({children, router, ...props}) {

  const { activeClassName, href } = props;

  const child = Children.only(children);
  let className = child.props.className || "";

  
  // if (router.asPath === '/blogEditor'){
  //   return (
  //     <Link href={router.asPath} as='/blogs/new'>
  //       {React.cloneElement(child, {className})}
  //     </Link>
  //   );
  // }else {
  //   if (router.asPath === '/userBlogs'){
  //     return (
  //       <Link href={router.asPath} as='/blogs/dashboard'>
  //         {React.cloneElement(child, {className})}
  //       </Link>
  //     );
  //   }
  // }

  if (router.asPath === href && activeClassName) {
    className = `${className} ${props.activeClassName}`
  }

  delete props.activeClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {className})}
    </Link>
  );
};

export default withRouter(ActiveLink);