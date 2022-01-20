import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'


export const Header =() => {
    return (
        <Navbar bg="dark" variant="dark" className="justify-content-center" style={{width:"100%"}}>
            <Navbar.Brand>
                <h2>DeFi Yield Farming</h2>
            </Navbar.Brand>
        </Navbar>
    );
};

export default Header;