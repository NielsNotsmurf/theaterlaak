import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import { MainContext } from './MainContext';
import { getLocalUser } from './Helpers/storageHelper';

export function NavMenu() {
    const { user } = useContext(MainContext);
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">theater Laak</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        {user ?
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Programmering" alt="link naar Programmering">Programmering</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Contact" alt="link naar Contact pagina">Contact</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/doneren">Doneren</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/profiel">Profiel</NavLink>
                                </NavItem>
                                {getLocalUser().roles && getLocalUser().roles.find(role => role === 'Beheerder') ?
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/beheer">Beheer</NavLink>
                                    </NavItem> 
                                    </>
                                    : <></>
                                }
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/logout">Uitloggen</NavLink>
                                </NavItem>
                            </>
                            :
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Registreren">Registreren</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Login">Login</NavLink>
                                </NavItem>
                            </>}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}

