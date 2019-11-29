import { useState } from 'react'
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
} from 'reactstrap';

import { useAuth0 } from "../../../react-auth0-spa";

import BsNavLink from './BsNavLink';
import Login from './Login';
import Spinner from '../../layouts/Spinner';

const namespace = process.env.NAMESPACE

function Header (props){

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false)

  const { isAuthenticated, loading, logout, user } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const renderMenu = () => {
    if (user && user[`${namespace}/role`] === 'siteOwner'){
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" isOpen={dropdownOpen} toggle={toggleDropdown} nav inNavbar>
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs"
                title="Blog's"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogEditor"
                title="Create a new Blog"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/userBlogs"
                title="Blog's Dashboard"
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
    }

    return (
      <BsNavLink route="/blogs" title="Blog's" />
    )
  }

  const { className } = props

  const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

  return (
    <div>
      <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="md">
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
              {renderMenu()}
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/cv" title="CV" />
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
                    width="30"
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