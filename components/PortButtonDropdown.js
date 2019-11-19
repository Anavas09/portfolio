import React, { useState } from 'react';

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const PortButtonDropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const renderDropdownMenu = (items) => {
    if (items.length >= 0){
      return (
        <DropdownMenu>
          {
            items.map((item, i) => {
              return (
                <DropdownItem key={i} {...item.handlers}>{item.text}</DropdownItem>
              )
            })
          }
        </DropdownMenu>
      )
    }else {
      return
    }
  }

  const { items } = props;

  return (
    <ButtonDropdown className="port-dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="sm">
        {renderDropdownMenu(items)}
      </DropdownToggle>
    </ButtonDropdown>
  );
}

export default PortButtonDropdown;