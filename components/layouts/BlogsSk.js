import React, { Fragment } from 'react';
import { Skeleton } from 'antd';

function BlogsSk(){
  return (
    <Fragment>
      <Skeleton active paragraph={{ rows: 4 }}/>
      <Skeleton active paragraph={{ rows: 5 }}/>
      <Skeleton active paragraph={{ rows: 4 }}/>
      <Skeleton active paragraph={{ rows: 6 }}/>
    </Fragment>
    
    )
}

export default BlogsSk;