import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const User = () => {
    const [users, setUsers] = useState([])
    const [forUpdate, setForUpdate] = useState(true)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [classDuration, setClassDuration] = useState("")
    const [daysInWeek, setDaysInWeek] = useState("")
    const [admissionFees, setAdmissionFees] = useState("")
    const [discount, setDiscount] = useState("")


    // get all offers
    const getAllUsers = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth//get-users`);
            if (data.success) {
                setUsers(data.users)

            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting Users");
        }
    }
    useEffect(() => {
        getAllUsers();
    }, [])


    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/price/delete-offer/${pId}`);
            if (data.success) {
                toast.success(`Successfully Deleted`);
                getAllUsers()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong during delete")
        }
    }
    return (
        <>
            <div className="adminContainer">
                <h2 className="section-common-heading">Users</h2>

                <div className='add-btn'>
                    <Link className="btn" to='/dashboard/register' >
                        Add Users
                    </Link>
                    <Link className="btn mx-2" to='/dashboard/change-password' >
                        Change Password
                    </Link>
                </div>
                <table className="table table-hover table-bordered border-secondary">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((c, index) =>
                            <>
                                <tr >
                                    <th scope="row">{index + 1}</th>
                                    <td >{(c.name)}</td>
                                    <td >{(c.email)}</td>
                                    <td >{c.contactNo}</td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default User
