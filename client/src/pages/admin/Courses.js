import Layout from '../../Components/Layout/Layout'
import AdminHeader from '../../Components/Layout/AdminHeader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Courses = () => {
    const [courses, setCourses] = useState([])
    const [id, setId] = useState("");
    const [forUpdate, setForUpdate] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const [DBfile, setDBFile] = useState("")


    // getting courses
    const getCourses = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/courses/get-courses`);
            if (data.success) {
                setCourses(data.courses)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting Courses");
        }
    }
    useEffect(() => {
        getCourses();
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
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/courses/update-course/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (data.success) {
                toast.success(data.message);
                getCourses()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during update course")
        }
    }


    const addOffer = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("file", file);

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/courses/add-course`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (data.success) {
                toast.success(data.message);
                getCourses()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during adding course")
        }
    }

    const getCourse = async (pId) => {
        try {
            setForUpdate(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/courses/single-course/${pId}`);
            if (data.success) {
                setId(data.course._id)
                setTitle(data.course.title)
                setDescription(data.course.description)
                setDBFile(data.course.image)
                setFile("")

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during getting course")
        }
    }

    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/courses/delete-course/${pId}`);
            if (data.success) {
                toast.success(data.message);
                getCourses()
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
            <Layout title="Admin courses">
                <AdminHeader />
                <div className="adminContainer">

                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{(forUpdate) ? "Update Courses" : "Add Courses"}</h5>
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
                                                            alt="alburhan Course"
                                                            height={"100px"}
                                                            className="img img-responsive"
                                                        />
                                                    </div>
                                                ) : (
                                                    DBfile && (<div className="text-center">
                                                        <img
                                                            src={require(`../../Assets/images/${DBfile}`)}
                                                            alt="alburhan course"
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
                                                        alt="alburhan course"
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
                                    {(forUpdate) ? (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleUpdate}>Update</button>) : (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addOffer} >Add</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="section-common-heading">Courses</h2>

                    <div className='add-btn'>
                        <button type="button" className="btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddOffer}>
                            Add Course
                        </button>
                    </div>
                    {(courses.length >= 1) ? (
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
                                {courses?.map((c, index) =>
                                    <>
                                        <tr >
                                            <th scope="row">{index + 1}</th>
                                            <td >{(c.title)}</td>
                                            <td >{(c.description.length > 15) ? (c.description.slice(0, 20) + "...") : (c.description)}</td>
                                            <td >
                                                <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { getCourse(c._id) }}>
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
                            <h5>No Courses Yet! Please add some courses </h5>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default Courses
