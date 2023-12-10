import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [sports, setSports] = useState("");


    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, sports });
            if (res.data.success) {
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 1000);
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
            <Layout title={"Reset Password"}>
                <div className='login-section'>
                    <form className='form' onSubmit={handleResetPassword}>
                        <div className='title'>
                            <h2 className='section-common-heading'>Reset Password</h2>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='email' name='email'>Email</label><br />
                            <input type='email' required placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} id='email' name='email' />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='sports' name='sports'>Sports</label><br />
                            <input type='text' required placeholder='Enter your favorite Sport' value={sports} onChange={(e) => { setSports(e.target.value) }} id='sports' name='sports' />
                        </div>

                        <div className='forgotPassword'>
                            <Link to="/login">Login</Link>
                        </div>
                        <div className='btn-div'>
                            <button className='button login-btn' type='submit'>Reset</button>
                        </div>
                    </form>
                </div>
            </Layout >
        </>
    )
}

export default ForgotPass
