import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
    const navigate = useNavigate();

    const imageClick = () => {
        navigate('/');
    }

    const doLogout = (e) => {
        e.preventDefault();
        axios.post('/api/logout', { api_token: localStorage.getItem('auth_token') }).then(res => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            navigate('/');
        });
    }

    var authButtons = '';
    if (!localStorage.getItem('auth_token')) {
        authButtons = (
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="btn btn-outline-primary ml-1 mr-1" to="/register">Sign up</Link>
                <Link className="btn btn-primary ml-1 mr-1" to="/login">Log in</Link>
            </nav>
        )
    }
    else {
        authButtons = (
            <nav className="my-2 my-md-0 mr-md-3">
                {(localStorage.getItem('role') === 'Admin') ?
                    <DropdownButton id="admin-menu" variant='' title='Users'>
                        <Dropdown.Item href="/users">User List</Dropdown.Item>
                        <Dropdown.Item href="/usersContacts">Users Contacts</Dropdown.Item>
                    </DropdownButton>
                    : <></>}
                <DropdownButton id="contacts-menu" variant='' title='Contacts'>
                    <Dropdown.Item href="/contacts">My Contacts</Dropdown.Item>
                    <Dropdown.Item href="/createContact">Add Contact</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="user-menu" variant='' title={localStorage.getItem('name')}>
                    <Dropdown.Item href="/profile">Edit Profile</Dropdown.Item>
                    <Dropdown.Item href="/password">Change Password</Dropdown.Item>
                    <Dropdown.Item href="/logout" onClick={doLogout} >Log out</Dropdown.Item>
                </DropdownButton>
            </nav>
        )
    }



    return (

        <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <img src={logo} height="36" className="mr-2" onClick={() => imageClick()} />
            <h5 className="my-0 mr-md-auto font-weight-normal">Contact List Host</h5>
            {authButtons}
        </header>
    )
}

export default Header;
