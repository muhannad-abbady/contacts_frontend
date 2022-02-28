import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css'
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2'


const Contact = () => {
    const navigate = useNavigate();

    const [error_list, setError_list] = useState([]);

    const [loading, setLoading] = useState(false);

    const contactSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            note: document.getElementById('note').value,
            api_token: localStorage.getItem('auth_token'),
        }
        setLoading(true);
        axios.post('/api/contacts/add', data).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                navigate('/contacts');
            }
            else {
                setError_list(res.data.validation_error);
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
        <LoadingOverlay active={loading} spinner text="Sending your Data...">
            <Page title="Register">
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Add New Contact</div>

                                    <div className="card-body">
                                        <form method="POST" onSubmit={contactSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="name" className="col-md-4 col-form-label text-md-end">First Name</label>

                                                <div className="col-md-6">
                                                    <input id="name" type="text" className="form-control " name="name" required="" autoComplete="name" autoFocus="" />
                                                    <span className="error left">{error_list.name}</span>
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
                                                    <span className="error left">{error_list.phone}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="note" className="col-md-4 col-form-label text-md-end">Note</label>

                                                <div className="col-md-6">
                                                    <textarea id="note" className="form-control " name="note" rows="4" >
                                                    </textarea>
                                                    <span className="error left">{error_list.note}</span>
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

export default Contact;