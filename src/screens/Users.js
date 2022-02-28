import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2'


const Users = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.post('api/users/all', { api_token: localStorage.getItem('auth_token') }).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                setUsers(res.data.data);
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: res.data.errorMessage,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
            }
        }).catch(function (error) {
            setLoading(false);
            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                confirmButtonText: 'close'
            });
        });
    }, []);

    return (
        <LoadingOverlay active={loading} spinner text="Loading...">
            <Page title="Edit Profile">

                <main className="py-4">
                    <div className="container">

                        <div className="row justify-content-center">

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">Users</div>

                                    <div className="card-body">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th width="15%">first name</th>
                                                    <th width="15%">Last name</th>
                                                    <th >Email</th>
                                                    <th width="20%">Phone</th>
                                                    <th width="10%">Role</th>
                                                    <th width="10%">contacts</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr>
                                                        <td>{user.firstName}</td>
                                                        <td>{user.lastName}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                                                        <td>{user.contacts_count}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Page>
        </LoadingOverlay>
    )
}

export default Users;