import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Register_API } from '../../utils/constants';

function Register() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, phone)
        const rawResponse = await fetch(Register_API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone })
        }).then(res => res.json());

        setMessage(rawResponse.message)
        if (rawResponse.sucess) {
            navigate('/login');
        }
    };

    return (
        <form className='formcontaniner' onSubmit={handleSubmit}>
            <h2 className='loginTitle'>Map Me</h2>
            <h5 className='my-3'>Register</h5>
            <h6 className='message'>{message && message}</h6>
            {/* Name input */}
            <div className="form-outline mb-4">
                <label className="form-label">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
            </div>
            {/* Email input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* Password input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="pass">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="pass" type="password" className="form-control" />
            </div>
            {/* Phone */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="phone">Phone</label>
                <input value={phone} id="phone" onChange={(e) => setPhone(e.target.value)} className="form-control" />
            </div>
            {/* 2 column grid layout for inline styling */}
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                </div>
            </div>
            <div className="text-center">
                <p>Already Register? <Link to="/login">Login</Link></p>
            </div>
        </form>

    )
}

export default Register