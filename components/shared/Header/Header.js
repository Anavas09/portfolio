import { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { useAuth0 } from "../../../react-auth0-spa";

import BsNavLink from './BsNavLink';
import Login from './Login';
import Spinner from '../../layouts/Spinner';

function Header (props){

  const [isOpen, setIsOpen] = useState(false)

  const { isAuthenticated, loading, logout, user } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const { className } = props

  return (
    <div>
      <Navbar className={`port-navbar port-nav-base absolute ${className}`} color="transparent" dark expand="md">
        <NavbarBrand className="port-navbar-brand" href="/">Angel Navas</NavbarBrand>
        <NavbarToggler onClick={() => toggle()} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/portfolios" title="Portfolios" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/about" title="About"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/blogs" title="Blogs" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/cv" title="CV's" />
            </NavItem>
            {!isAuthenticated && (
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
              )
            }
            {loading && (
              <NavItem>
                <Spinner />
              </NavItem>
              )
            }
            {(isAuthenticated && user) && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="profileDropDown">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="nav-user-profile rounded-circle"
                    width="50"
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.name}</DropdownItem>
                  <DropdownItem
                    className="dropdown-profile"
                  > Profile
                  </DropdownItem>
                  <DropdownItem
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  > Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;