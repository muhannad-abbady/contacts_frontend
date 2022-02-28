import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css'
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2'


const Register = () => {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);

    const [registerInput, setRegister] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        error_list: [],
    })
    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const Pconfirm = () => {
        var e = document.getElementById('confirmPassword');
        if (registerInput.password != e.value) {
            setRegister({ ...registerInput, error_list: { confirmPassword: 'Confirm Password do not match password!' } });
            return false;
        }
        else {
            setRegister({ ...registerInput, error_list: { ...registerInput.error_list, confirmPassword: '' } });
            return true;
        }
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if (Pconfirm()) {
            const data = {
                firstName: registerInput.firstName,
                lastName: registerInput.lastName,
                phone: document.getElementById('phone').value,
                email: registerInput.email,
                password: registerInput.password,
            }
            setLoading(true);
            axios.post('/api/register', data).then(res => {
                setLoading(false);
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('name', res.data.username);
                    localStorage.setItem('role', res.data.role);
                    Swal.fire({
                        title: 'Success',
                        text: res.data.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    });
                    navigate('/');
                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_error });
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
    }

    return (
        <LoadingOverlay active={loading} spinner text="Sending your Data...">
        <Page title="Register">
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>

                                <div className="card-body">
                                    <form method="POST" onSubmit={registerSubmit}>
                                        <div className="row mb-3">
                                            <label htmlFor="firstName" className="col-md-4 col-form-label text-md-end">First Name</label>

                                            <div className="col-md-6">
                                                <input id="firstName" type="text" className="form-control " name="firstName" value={registerInput.firstName} onChange={handleInput} required="" autoComplete="firstName" autoFocus="" />
                                                <span className="error left">{registerInput.error_list.firstName}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="lastName" className="col-md-4 col-form-label text-md-end">Last Name</label>

                                            <div className="col-md-6">
                                                <input id="lastName" type="text" className="form-control " name="lastName" value={registerInput.lastName} onChange={handleInput} required="" autoComplete="lastName" autoFocus="" />
                                                <span className="error left">{registerInput.error_list.lastName}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control " name="email" value={registerInput.email} onChange={handleInput} required="" autoComplete="email" />
                                                <span className="error left">{registerInput.error_list.email}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="phone" className="col-md-4 col-form-label text-md-end">Phone Number</label>

                                            <div className="col-md-6">
                                                <IntlTelInput
                                                    containerClassName="intl-tel-input iti"
                                                    inputClassName="form-control"
                                                    fieldName="phone"
                                                    autoComplete="phone"
                                                    fieldId="phone"
                                                    placeholder=""
                                                />
                                                <span className="error left">{registerInput.error_list.phone}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control " name="password" required="" onChange={handleInput} autoComplete="password" />
                                                <span className="error left">{registerInput.error_list.password}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="confirmPassword" className="col-md-4 col-form-label text-md-end">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input id="confirmPassword" type="password" className="form-control" name="confirmPassword" required="" onChange={Pconfirm} autoComplete="off" />
                                                <span className="error left">{registerInput.error_list.confirmPassword}</span>
                                            </div>
                                        </div>

                                        <div className="row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
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

export default Register;