import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import { NavLink as Link, useHistory } from 'react-router-dom';
import './NavBar.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container,
} from 'reactstrap';

const NavBar = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Container>
          <NavbarBrand href='/'>Jobly</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              {user ? (
                <>
                  <Link to='/companies'>
                    <NavItem>
                      <NavLink>Companies</NavLink>
                    </NavItem>
                  </Link>
                  <Link to='/jobs'>
                    <NavItem>
                      <NavLink>Jobs</NavLink>
                    </NavItem>
                  </Link>
                  <Link to='/profile'>
                    <NavItem>
                      <NavLink>Profile</NavLink>
                    </NavItem>
                  </Link>
                  <NavItem>
                    <NavLink onClick={handleLogout}>
                      Logout {user.username}
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <Link to='/login'>
                    <NavItem>
                      <NavLink>Login</NavLink>
                    </NavItem>
                  </Link>
                  <Link to='/signup'>
                    <NavItem>
                      <NavLink>Sign Up</NavLink>
                    </NavItem>
                  </Link>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
