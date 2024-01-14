import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AdminHeader from '../../Components/Layout/AdminHeader'
import Layout from '../../Components/Layout/Layout'

const Carousel = () => {
    const [carousels, setCarousels] = useState([])
    const [id, setId] = useState("");
    const [forUpdate, setForUpdate] = useState(true)
    const [author, setAuthor] = useState("")
    const [sayings, setSayings] = useState("")
    const [file, setFile] = useState("")
    const [DBfile, setDBFile] = useState("")




    // getting Carousels
    const getCarousels = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/carousel/get-carousels`);
            if (data.success) {
                setCarousels(data.carousel)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting Carousels");
        }
    }
    useEffect(() => {
        getCarousels();
    }, [])

    const handleAddCarousel = async () => {
        setForUpdate(false)
        setAuthor("")
        setSayings("")
        setFile("")
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("author", author);
            formData.append("sayings", sayings);
            formData.append("file", file);
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/carousel/update-carousel/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (data.success) {
                toast.success(data.message);
                getCarousels()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during update Carousel")
        }
    }
    const addCarousel = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("author", author);
            formData.append("sayings", sayings);
            formData.append("file", file);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/carousel/add-carousel`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (data.success) {
                toast.success(data.message);
                getCarousels()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during adding Carousel")
        }
    }

    const getCarousel = async (pId) => {
        try {
            setForUpdate(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/carousel/single-carousel/${pId}`);
            if (data.success) {
                setId(data.carousel._id)
                setAuthor(data.carousel.author)
                setSayings(data.carousel.sayings)
                setDBFile(data.carousel.image)
                setFile("")

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during getting Carousel")
        }
    }

    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/carousel/delete-carousel/${pId}`);
            if (data.success) {
                toast.success(data.message);
                getCarousels()
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
            <Layout title="Admin | Carousel">
                <AdminHeader />
                <div className="adminContainer">
                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{(forUpdate) ? "Update Carousel" : "Add Carousel"}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="title" style={{ "fontSize": 10 }}>Enter Author Name</label>
                                            <input type="text" className="form-control" id="title" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="description" style={{ "fontSize": 10 }}>Enter Sayings</label>

                                            <textarea className="form-control" id="description" value={sayings} onChange={(e) => setSayings(e.target.value)} rows="4"></textarea>
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
                                                            alt="alburhan carousel"
                                                            height={"100px"}
                                                            className="img img-responsive"
                                                        />
                                                    </div>
                                                ) : (
                                                    DBfile && (<div className="text-center">
                                                        <img
                                                            src={require(`../../Assets/images/${DBfile}`)}
                                                            alt="alburhan carousel"
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
                                                        alt="alburhan carousel"
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
                                    {(forUpdate) ? (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleUpdate}>Update</button>) : (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addCarousel} >Add</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="section-common-heading">Carousels</h2>

                    <div className='add-btn'>
                        {(carousels.length === 3) ? (
                            <button type="button" className="btn" disabled data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddCarousel}>
                                Add Carousel
                            </button>
                        ) : (
                            <button type="button" className="btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddCarousel}>
                                Add Carousel
                            </button>
                        )}
                    </div>
                    {(carousels.length >= 1) ? (
                        <table className="table table-hover table-bordered border-secondary">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Sayings</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carousels?.map((c, index) =>
                                    <>
                                        <tr >
                                            <th scope="row">{index + 1}</th>
                                            <td >{(c.author)}</td>
                                            <td >{(c.sayings.length > 15) ? (c.sayings.slice(0, 20) + "...") : (c.sayings)}</td>
                                            <td >
                                                <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { getCarousel(c._id) }}>
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
                            <h5>No Carousel Yet! Please add Carousels </h5>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default Carousel
