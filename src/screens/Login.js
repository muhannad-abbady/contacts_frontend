import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Page from '../layouts/Master';
import axios from 'axios';
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }
    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }
        setLoading(true);
        axios.post('/api/login', data).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('name', res.data.username);
                localStorage.setItem('role', res.data.role);
                Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'close'
                });
                navigate('/');
            }
            else if (res.data.status === 401) {
                Swal.fire({
                    title: 'login fail',
                    text: res.data.message,
                    icon: 'warning',
                    confirmButtonText: 'close'
                });
            }
            else {
                setLogin({ ...loginInput, error_list: res.data.validation_error });
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
        <LoadingOverlay active={loading} spinner text="Loging in...">
            <Page title="Login">
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Login</div>

                                    <div className="card-body">
                                        <form method="POST" onSubmit={loginSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                                <div className="col-md-6">
                                                    <input id="email" type="email" className="form-control " name="email" onChange={handleInput} required="" autoComplete="email" autoFocus="" />
                                                    <span className="error left">{loginInput.error_list.email}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                                <div className="col-md-6">
                                                    <input id="password" type="password" className="form-control " name="password" required="" onChange={handleInput} autoComplete="current-password" />
                                                    <span className="error left">{loginInput.error_list.password}</span>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-primary">
                                                        Login
                                                    </button>

                                                    {/* <Link className="btn btn-link" to="http://127.0.0.1:8000/password/reset">
                                                        Forgot Your Password?
                                                    </Link> */}
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

export default Login;