import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../Components/Layout/Layout'
import AdminHeader from '../../Components/Layout/AdminHeader'

const Intro = () => {
    const [intro, setIntro] = useState([])
    const [id, setId] = useState("");
    const [forUpdate, setForUpdate] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const [DBfile, setDBFile] = useState("")




    // getting intro
    const getIntro = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/intro/get-intro`);
            if (data.success) {
                setIntro(data.intro)

            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting Intro");
        }
    }
    useEffect(() => {
        getIntro();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddOffer = async () => {
        setForUpdate(false)
        setTitle("")
        setDescription("")
        setFile("")
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("file", file);
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/intro/update-intro/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (data.success) {
                toast.success(data.message);
                getIntro()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during update intro")
        }
    }
    const addIntro = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("file", file);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/intro/add-intro`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (data.success) {
                toast.success(data.message);
                getIntro()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during adding Intro")
        }
    }

    const getOffer = async (pId) => {
        try {
            setForUpdate(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/intro/single-intro/${pId}`);
            if (data.success) {
                setId(data.intro._id)
                setTitle(data.intro.title)
                setDescription(data.intro.description)
                setDBFile(data.intro.image)
                setFile("")

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during getting Intro")
        }
    }

    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/intro/delete-intro/${pId}`);
            if (data.success) {
                toast.success(data.message);
                getIntro()
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
            <Layout title="Admin | Intro">
                <AdminHeader />
                <div className="adminContainer">
                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{(forUpdate) ? "Update Introduction" : "Add Introduction"}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="title" style={{ "fontSize": 10 }}>Enter Title</label>
                                            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="description" style={{ "fontSize": 10 }}>Enter Description</label>

                                            <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4"></textarea>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="file" style={{ "fontSize": 10 }}>Add File</label>
                                            <input type="file" className="form-control" id="file" accept="image/*" onChange={(e) => { setFile(e.target.files[0]); }} />
                                        </div>
                                        {(forUpdate) ? (<div className=" from-group mb-3">
                                            <div className="text-center">
                                                {file ? (
                                                    <div className="text-center">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt="alburhan Intro"
                                                            height={"100px"}
                                                            className="img img-responsive"
                                                        />
                                                    </div>
                                                ) : (
                                                    DBfile && (<div className="text-center">
                                                        <img
                                                            src={require(`../../Assets/images/${DBfile}`)}
                                                            alt="alburhan Intro"
                                                            height={"100px"}
                                                            className="img img-responsive"
                                                        />
                                                    </div>
                                                    )
                                                )}
                                            </div>
                                        </div>) : (<div className=" from-group mb-3">
                                            {file && (
                                                <div className="text-center">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="alburhan Intro"
                                                        height={"100px"}
                                                        className="img img-responsive"
                                                    />
                                                </div>
                                            )}
                                        </div>)}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    {(forUpdate) ? (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleUpdate}>Update</button>) : (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addIntro} >Add</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="section-common-heading">Introduction</h2>

                    <div className='add-btn'>
                        {(intro.length === 1) ? (
                            <button type="button" className="btn" disabled data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddOffer}>
                                Add Intro
                            </button>
                        ) : (
                            <button type="button" className="btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddOffer}>
                                Add Intro
                            </button>
                        )}
                    </div>
                    {(intro.length >= 1) ? (
                        <table className="table table-hover table-bordered border-secondary">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {intro?.map((c, index) =>
                                    <>
                                        <tr >
                                            <th scope="row">{index + 1}</th>
                                            <td >{(c.title)}</td>
                                            <td >{(c.description.length > 15) ? (c.description.slice(0, 20) + "...") : (c.description)}</td>
                                            <td >
                                                <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { getOffer(c._id) }}>
                                                    update
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
                            <h5>No Intro Yet! Please add Intro </h5>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default Intro
