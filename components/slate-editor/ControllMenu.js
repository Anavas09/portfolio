import React from 'react';
import { Button } from 'reactstrap';

function ControllMenu(props) {

  const { action, isLoadingData, saveBlog } = props;

  return (
    <div className="controll-menu">
      <h1 className="title">Write Your Story...</h1>
      <div className="status-box">
        {isLoadingData ? 'Saving...' : 'Save'}
      </div>
      <Button color="success" disabled={isLoadingData} onClick={() => saveBlog()}>{action}</Button>
    </div>
  );
};

export default ControllMenu;