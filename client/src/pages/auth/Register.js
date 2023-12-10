import AdminHeader from '../../Components/Layout/AdminHeader'
import Layout from '../../Components/Layout/Layout'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../Assets/styles/authForms.css"
import toast from 'react-hot-toast'
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/auth';

const Register = () => {
    const [name, setName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [sports, setSports] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth//signUp`, { name, contactNo, sports, email, password });
            if (res.data.success) {
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 1000);
                navigate(location.state || "/dashboard/admin")
            } else {
                toast.error(res.data.message)
                console.log("error")
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    return (
        <>
            <Layout title={"Register user"}>
                <AdminHeader />

                <div className='login-section'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='title'>
                            <h2 className='section-common-heading'>Register User</h2>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='name' name='name'>Username</label><br />
                            <input type='text' placeholder='Enter Username' id='name' name='name' required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='email' name='email'>Email</label><br />
                            <input type='email' placeholder='Enter Email' id='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='contactNo' name='contactNo'>Contact Number</label><br />
                            <input type='number' placeholder='Enter contact number' id='contactNo' name='contactNo' required value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='sports' name='sports'>Favorite Sport</label><br />
                            <input type='text' placeholder='Enter your Favorite Sport' id='sports' name='sports' required value={sports} onChange={(e) => setSports(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='password' name='password'>Password</label><br />
                            <input type='password' placeholder='Enter password' id='password' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='btn-div'>
                            <button type='submit' className='button login-btn'>Register</button>
                        </div>
                    </form>
                </div >
            </Layout >
        </>
    )
}

export default Register
