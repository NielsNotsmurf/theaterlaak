import React, { Component, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AppRoutes from '../AppRoutes';
import { getLocalUser } from './Helpers/storageHelper';

export function NavMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    updateRoles();
  }, [localStorage.getItem('user')]);
  const updateRoles = () => {
    const user = getLocalUser();
    if (user) {
      setRoles(user.roles);
    }
  };


  // AppRoutes.map((route, index) => {
  //   if(roles.includes("Beheerder")) {
  //     return () => {
  //       <NavItem>
  //         <NavLink tag={Link} className="text-dark" to="/beheer">Beheer</NavLink>
  //       </NavItem>
  //     }
  //   }
  //   else if(roles.includes("Gebruiker")) {
  //     return () => {
  //       <NavItem>
  //         <NavLink tag={Link} className="text-dark" to="/profiel">Profiel</NavLink>
  //       </NavItem>
  //     }
  //   }
  // })



  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">theater Laak</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/beheer">Beheer</NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}

