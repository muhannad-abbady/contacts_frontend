import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark col-md-2" >
            <Link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4">Sidebar</span>
            </Link>
            <hr />
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link to="#" class="nav-link active" aria-current="page">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="#" class="nav-link text-white">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="#" class="nav-link text-white">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="#" class="nav-link text-white">
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="#" class="nav-link text-white">
                        Customers
                    </Link>
                </li>
            </ul>
            <hr />
            <p>Contacts Count: 11</p>
        </div>
    )
}

export default Sidebar;