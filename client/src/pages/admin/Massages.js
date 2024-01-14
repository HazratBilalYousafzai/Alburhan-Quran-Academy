import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/Layout/AdminHeader'
import Layout from '../../Components/Layout/Layout'
import "../../Assets/styles/admin-pages.css"
import axios from 'axios'
import toast from 'react-hot-toast'

const Massages = () => {
    const [messages, setMessages] = useState([])
    const [singleMessage, setSingleMessage] = useState({})
    // get all messages 
    const getAllMessages = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/message/all-messages`);
            if (data.success) {
                setMessages(data.contacts)

            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting messages");
        }
    }
    useEffect(() => {
        getAllMessages();
    }, [])

    // Delete message 
    const handleDelete = async (mId) => {

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/message/delete-message/${mId}`);
            console.log(data.success);
            if (data.success) {
                toast.success(`Category Successfully Deleted`);
                getAllMessages()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong during delete")
        }

    }
    // get message 
    const getMessage = async (mId) => {

        try {
            console.log(mId)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/message/single-message/${mId}`);
            const { read } = await axios.patch(`${process.env.REACT_APP_API}/api/v1/message/read-message/${mId}`, { read: true });
            if (data.success) {
                setSingleMessage(data.contact)
                getAllMessages()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong during getting message")
        }

    }

    return (
        <>
            <Layout title="Admin | messages">
                <AdminHeader />

                <div className="adminContainer">

                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{singleMessage.username}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h6> Subject: {singleMessage.subject}</h6>

                                </div>
                                <div className="modal-body">
                                    <h6>Message</h6>
                                    {singleMessage.message}
                                </div>
                                <div className="modal-footer">
                                    <h6 className="email">Email: {singleMessage.email}</h6>
                                    <h6 className="phone">Date: {singleMessage.createdAt} </h6>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${singleMessage.email}`} className="btn btn-primary" rel="noreferrer noopener" target="_blank">Reply</a>
                                    {/* <button type="button" className="btn btn-primary">Reply</button> */}
                                </div>
                            </div>
                        </div>

                    </div>
                    <h2 className="section-common-heading m-5">Messages</h2>
                    {(messages.length >= 1) ? (
                        <table className="table table-hover table-bordered border-secondary">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages?.map((c, index) =>
                                    <>
                                        <tr key={index} className={(!c.read) ? `text-primary` : `text-dark`}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{(c.username.length > 15) ? (c.username.slice(0, 13) + "..") : (c.username)}</td>
                                            <td>{(c.subject.length > 15) ? (c.subject.slice(0, 15) + "...") : (c.subject)}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => getMessage(c._id)}>
                                                    Read
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={() => { handleDelete(c._id) }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className=' text-center'>
                            <h5>No messages</h5>
                        </div>
                    )}
                </div>

            </Layout>
        </>
    )
}

export default Massages
