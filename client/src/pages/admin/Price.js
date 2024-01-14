import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/Layout/AdminHeader'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'


const Price = () => {
    const [offers, setOffers] = useState([])
    const [forUpdate, setForUpdate] = useState(true)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [classDuration, setClassDuration] = useState("")
    const [daysInWeek, setDaysInWeek] = useState("")
    const [admissionFees, setAdmissionFees] = useState("")
    const [discount, setDiscount] = useState("")


    // get all offers
    const getAllOffers = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/price/all-offers`);
            if (data.success) {
                setOffers(data.offers)

            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting offers");
        }
    }
    useEffect(() => {
        getAllOffers();
    }, [])

    const handleAddOffer = async () => {
        setForUpdate(false)
        setTitle("")
        setPrice("")
        setClassDuration("")
        setDaysInWeek("")
        setAdmissionFees("")
        setDiscount("")
    }

    const addOffer = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/price/add-offer`, { title, price, classDuration, daysInWeek, admissionFees, discount });
            if (data.success) {
                toast.success(data.message);
                getAllOffers()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during adding offer")
        }
    }


    const getOffer = async (pId) => {
        try {
            setForUpdate(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/price/single-offer/${pId}`);
            console.log(data.success);
            if (data.success) {
                setId(data.offer._id)
                setTitle(data.offer.title)
                setPrice(data.offer.price)
                setClassDuration(data.offer.classDuration)
                setDaysInWeek(data.offer.daysInWeek)
                setAdmissionFees(data.offer.admissionFees)
                setDiscount(data.offer.discount)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong during getting message")
        }
    }
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/price/delete-offer/${pId}`);
            if (data.success) {
                toast.success(`Successfully Deleted`);
                getAllOffers()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong during delete")
        }
    }

    // update 
    const handleUpdate = async (id) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/price/update-offer/${id}`, { title, price, classDuration, daysInWeek, admissionFees, discount });
            if (data.success) {
                toast.success(`Successfully updated`);
                getAllOffers()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during update")
        }
    }
    return (
        <>
            <Layout title="Admin | Price">
                <AdminHeader />
                <div className="adminContainer">

                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{(forUpdate) ? "Update Offers" : "Add Offers"}</h5>
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
                                            <label htmlFor="price" style={{ "fontSize": 10 }}>Enter Price</label>
                                            <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="classDuration" style={{ "fontSize": 10 }}>Duration Of Class</label>
                                            <input type="text" className="form-control" id="classDuration" value={classDuration} onChange={(e) => setClassDuration(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="DaysInWeek" style={{ "fontSize": 10 }}>Days/Week</label>
                                            <input type="text" className="form-control" id="DaysInWeek" value={daysInWeek} onChange={(e) => setDaysInWeek(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="AdmissionFees" style={{ "fontSize": 10 }}>Admission fees </label>
                                            <input type="text" className="form-control" id="AdmissionFees" value={admissionFees} onChange={(e) => setAdmissionFees(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="discount" style={{ "fontSize": 10 }}>Discount</label>
                                            <input type="text" className="form-control" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                        </div>
                                    </form>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    {(forUpdate) ? (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleUpdate(id)}  >Update </button>) : (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addOffer} >Add</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="section-common-heading">Prices</h2>

                    <div className='add-btn'>
                        <button type="button" className="btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddOffer}>
                            Add Offer
                        </button>
                    </div>
                    {(offers.length >= 1) ? (
                        <table className="table table-hover table-bordered border-secondary">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers?.map((c, index) =>
                                    <>
                                        <tr >
                                            <th scope="row">{index + 1}</th>
                                            <td >{(c.title)}</td>
                                            <td >{(c.price)}</td>
                                            <td >
                                                <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => getOffer(c._id)}>
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
                            <h5>No offers Yet! Please add Offers </h5>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default Price
