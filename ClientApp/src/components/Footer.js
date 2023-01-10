import React, { Component } from "react";
import { Nav, NavLink, } from 'reactstrap';
import './styles/footer.css'

export class Footer extends Component
{
 
    render()
    {
        return (
            <Nav className="footer">
                <NavLink className="p" href="/">Theater Laak</NavLink>
                <NavLink className="p" href="/">Nieuwsbrief</NavLink>
                <NavLink className="p" href="/">Over ons</NavLink>
                <NavLink className="p" href="/Contact">Contact</NavLink>
                <NavLink className="p" href="/Programmering">Voorstellingen</NavLink>
            </Nav>
        );
    }
}

export default Footer;