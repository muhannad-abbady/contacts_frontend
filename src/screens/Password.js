import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css'
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2'


const Password = () => {

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);
    
    const profileSubmit = (e) => {
        e.preventDefault();
        const data = {
            password: document.getElementById('password').value,
            currentPassword: document.getElementById('currentPassword').value,
            api_token: localStorage.getItem('auth_token'),
        }
        setLoading(true);
        axios.post('/api/profile/password', data).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                localStorage.setItem('name', res.data.username);
                Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'close'
                });
                navigate('/');
            }
            else {
                setErrorMessages(res.data.validation_error);
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
    }

    const Pconfirm = () => {
        var conf = document.getElementById('confirmPassword');
        var pwd = document.getElementById('password');
        var curr = document.getElementById('currentPassword');
        if (curr.value === pwd.value) {
            setErrorMessages({ ...errorMessages, password: 'The new password must be different from the current one' });
            return false;
        }
        else {
            if (pwd.value != conf.value) {
                setErrorMessages({ confirmPassword: 'Confirm Password do not match password!' } );
                return false;
            }
            else {
                setErrorMessages({});
                return true;
            }
        }


    }

    return (
        <LoadingOverlay active={loading} spinner text="Updating a Password...">
        <Page title="Register">
            <main className="py-4">

                <div className="container">
                    
                    <div className="row justify-content-center">

                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Change Password</div>

                                <div className="card-body">
                                    <form method="POST" onSubmit={profileSubmit}>
                                        <div className="row mb-3">
                                            <label htmlFor="currentPassword" className="col-md-4 col-form-label text-md-end">Current Password</label>

                                            <div className="col-md-6">
                                                <input id="currentPassword" type="password" className="form-control " name="currentPassword" required=""  autoComplete="password" />
                                                <span className="error left">{errorMessages.currentPassword}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control " name="password" required="" onChange={Pconfirm} autoComplete="off" />
                                                <span className="error left">{errorMessages.password}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="confirmPassword" className="col-md-4 col-form-label text-md-end">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input id="confirmPassword" type="password" className="form-control" name="confirmPassword" required="" onChange={Pconfirm} autoComplete="off" />
                                                <span className="error left">{errorMessages.confirmPassword}</span>
                                            </div>
                                        </div>                                       

                                        <div className="row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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

export default Password;