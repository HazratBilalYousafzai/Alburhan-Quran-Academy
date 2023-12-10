import Layout from '../../Components/Layout/Layout'
import React, { useState } from 'react'
import "../../Assets/styles/authForms.css"
import toast from 'react-hot-toast'
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from '../../Components/Layout/AdminHeader'
import { useAuth } from '../../context/auth';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [conformNewPassword, setConformNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API}/api/v1/auth/change-password`, { password, newPassword, conformNewPassword });
            if (res.data.success) {
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 1000);
                setAuth({
                    ...auth,
                    user: null,
                    token: "",
                })
                localStorage.removeItem("auth")
                navigate(location.state || "/")
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
            <Layout title={"Admin | Change password"}>
                <AdminHeader />

                <div className='login-section'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='title'>
                            <h2 className='section-common-heading'>Change Password</h2>
                        </div>

                        <div className='input-field'>
                            <label htmlFor='newPassword' name='newPassword'>Enter new password</label><br />
                            <input type='password' placeholder='Enter new password' id='newPassword' required name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='conformNewPassword' name='conformNewPassword'>Conform new password</label><br />
                            <input type='password' placeholder='conform new password' id='conformNewPassword' required name='conformNewPassword' value={conformNewPassword} onChange={(e) => setConformNewPassword(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='password' name='password'>Password</label><br />
                            <input type='password' placeholder='Enter old password' id='password' required name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='btn-div'>
                            <button type='submit' className='button login-btn'>Change Password</button>
                        </div>
                    </form>
                </div>
            </Layout >
        </>
    )
}

export default ChangePassword
