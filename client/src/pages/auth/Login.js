import Layout from '../../Components/Layout/Layout'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../Assets/styles/authForms.css"
import toast from 'react-hot-toast'
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/signIn`, { email, password });
            if (res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 1000);
                localStorage.setItem("auth", JSON.stringify(res.data))
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
            <Layout title={"LogIn"}>
                <div className='login-section'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='title'>
                            <h2 className='section-common-heading'>Login</h2>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='email' name='email'>Email</label><br />
                            <input type='email' placeholder='Enter Email' id='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='password' name='password'>Password</label><br />
                            <input type='password' placeholder='Enter password' id='password' required name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='forgotPassword'>
                            <Link to="/forgot-pass">Forgot password</Link>
                        </div>
                        <div className='btn-div'>
                            <button type='submit' className='button login-btn'>LogIn</button>
                        </div>
                    </form>
                </div>
            </Layout >
        </>
    )
}

export default Login
