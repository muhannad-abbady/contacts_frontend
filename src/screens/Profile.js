import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css'
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2'


const Profile = () => {

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);

    const [profileInput, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        Role: '',
        error_list: [],
    })

    useEffect(() => {
        setLoading(true);
        axios.post('/api/profile', { api_token: localStorage.getItem('auth_token') }).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                setProfile({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phone: res.data.phone,
                    role: res.data.role,
                    error_list: [],
                })
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: 'Session Expire \n You have to Login again',
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                navigate('/login');
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
    
    const handleInput = (e) => {
        e.persist();
        setProfile({ ...profileInput, [e.target.name]: e.target.value });
    }

    const profileSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: profileInput.firstName,
            lastName: profileInput.lastName,
            phone: document.getElementById('phone').value,
        }
        console.log(data);
        setLoading(true);
        axios.post('/api/profile/update', { ...data, api_token: localStorage.getItem('auth_token') }).then(res => {
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
                setProfile({ ...profileInput, error_list: res.data.validation_error });
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

    return (
        <LoadingOverlay active={loading} spinner text="Loading...">
        <Page title="Edit Profile">
            
                <main className="py-4">
                    <div className="container">
                        
                        <div className="row justify-content-center">

                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Register</div>

                                    <div className="card-body">
                                        <form method="POST" onSubmit={profileSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="firstName" className="col-md-4 col-form-label text-md-end">First Name</label>

                                                <div className="col-md-6">
                                                    <input id="firstName" type="text" className="form-control " name="firstName" value={profileInput.firstName} onChange={handleInput} required="" autoComplete="firstName" autoFocus="" />
                                                    <span className="error left">{profileInput.error_list.firstName}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="lastName" className="col-md-4 col-form-label text-md-end">Last Name</label>

                                                <div className="col-md-6">
                                                    <input id="lastName" type="text" className="form-control " name="lastName" value={profileInput.lastName} onChange={handleInput} required="" autoComplete="lastName" autoFocus="" />
                                                    <span className="error left">{profileInput.error_list.lastName}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                                <div className="col-md-6">
                                                    <p id="email" className="form-control " name="email" >{profileInput.email}</p>
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
                                                        value={profileInput.phone}
                                                    />
                                                    <span className="error left">{profileInput.error_list.phone}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="role" className="col-md-4 col-form-label text-md-end">Role</label>

                                                <div className="col-md-6">
                                                    <p id="role" className="form-control " name="email" >{profileInput.role}</p>
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

export default Profile;