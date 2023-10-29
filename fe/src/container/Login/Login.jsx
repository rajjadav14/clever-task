import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Login_API } from '../../utils/constants';


function Login() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = Login_API;
        console.log(api, email, password);
        const rawResponse = await fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());
        console.log('raw', rawResponse)

        setMessage(rawResponse.message);
        if (rawResponse.success) {
            const token = rawResponse.token;
            localStorage.setItem('token', token);
            navigator('/');
        }
    }
    return (
        <form className='formcontaniner' onSubmit={handleSubmit}>
            <h2 className='loginTitle'>Map Me</h2>
            <h6 className='message'>{message && message}</h6>
            {/* Email input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Email address</label>
                <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* Password input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            {/* 2 column grid layout for inline styling */}
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                </div>
            </div>

            {/* Register buttons */}
            <div className="text-center">
                <p>Not a member? <Link to="/register">Register</Link></p>
            </div>
        </form>

    )
}

export default Login