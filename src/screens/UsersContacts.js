import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2'


const Contacts = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.post('/api/users/contacts/all', { api_token: localStorage.getItem('auth_token') }).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                setContacts(res.data.data);
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
                            {contacts.map((user, index) => (
                                <div className="col-md-12 mb-5">

                                    <div className="card">
                                        <div className="card-header">{user.firstName} {user.lastName}</div>
                                        <div className="card-body">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th width="30%">Name</th>
                                                        <th width="20%">Phone</th>
                                                        <th>Note</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {user.contacts.map((contact, index) => (
                                                        <tr>
                                                            <td>{contact.name}</td>
                                                            <td>{contact.phone}</td>
                                                            <td>{contact.note}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </Page>
        </LoadingOverlay>
    )
}

export default Contacts;