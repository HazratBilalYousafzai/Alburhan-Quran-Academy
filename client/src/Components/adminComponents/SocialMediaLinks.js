import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const SocialMediaLinks = () => {
    const [socialLinks, setSocialLinks] = useState([])
    const [forUpdate, setForUpdate] = useState(true)
    const [id, setId] = useState("")
    const [facebook, setFacebook] = useState("")
    const [youtube, setYoutube] = useState("")
    const [whatsapp, setWhatsapp] = useState("")



    // get all social Links
    const getAllSocialLinks = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/social-links/all-social-links`);
            if (data.success) {
                setSocialLinks(data.socialLinks)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting social links");
        }
    }
    useEffect(() => {
        getAllSocialLinks();
    }, [])

    const handleAddOffer = async () => {
        setForUpdate(false)
        setFacebook("")
        setYoutube("")
        setWhatsapp("")
    }

    const addSocialLinks = async () => {
        try {
            console.log(facebook, youtube, whatsapp)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/social-links/add-social-links`, { facebook, youtube, whatsapp });
            if (data.success) {
                toast.success(data.message);
                getAllSocialLinks()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during adding Social Links")
        }
    }


    const getOffer = async (pId) => {
        try {
            setForUpdate(true)
            socialLinks.map((e, index) => {
                setId(e._id)
                setFacebook(e.facebook)
                setYoutube(e.youtube)
                setWhatsapp(e.whatsapp)
            })
        } catch (error) {
            console.log(error);
            toast.error("something went wrong during updating")
        }
    }
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/social-links/delete-social-links/${pId}`);
            if (data.success) {
                toast.success(data.message);
                getAllSocialLinks()
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
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/social-links/update-social-links/${id}`, { facebook, youtube, whatsapp });
            if (data.success) {
                toast.success(`Successfully updated`);
                getAllSocialLinks()
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
            <div className="adminContainer">

                {/* Modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{(forUpdate) ? "Update Social Links" : "Add Social Links"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="title" style={{ "fontSize": 10 }}>Enter Facebook Url</label>
                                        <input type="text" className="form-control" id="title" value={facebook} onChange={(e) => setFacebook(e.target.value)} required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="classDuration" style={{ "fontSize": 10 }}>Enter Youtube Url</label>
                                        <input type="text" className="form-control" id="classDuration" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="DaysInWeek" style={{ "fontSize": 10 }}>Enter Whatsapp Number</label>
                                        <input type="number" className="form-control" id="DaysInWeek" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {(forUpdate) ? (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleUpdate(id)}  >Update </button>) : (<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addSocialLinks} >Add</button>)}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="section-common-heading">Social Links</h2>

                <div className='add-btn'>
                    {(socialLinks?.length >= 1) ? (
                        <button type="button" className="btn" disabled data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddOffer}>
                            Add Intro
                        </button>
                    ) : (
                        <button type="button" className="btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleAddOffer}>
                            Add Intro
                        </button>
                    )}
                </div>
                {(socialLinks?.length >= 1) ? (
                    <div className="card" style={{ height: 300 }}>
                        <h3 className="card-header p-4">Social Media Links</h3>
                        {socialLinks?.map((c, index) =>
                            <>
                                <div className="card-body px-4">
                                    <h5 className="card-title">Facebook</h5>
                                    <a href={c.facebook} className="card-text" target="_blank" rel="noopener noeferror">{c.facebook}</a>
                                    <h5 className="card-title">youtube</h5>
                                    <a href={c.youtube} className="card-text" target="_blank" rel="noopener noeferror">{c.youtube}</a>
                                    <h5 className="card-title">whatsapp</h5>
                                    <p className="card-text">{c.whatsapp}</p>
                                    <div className="d-flex">
                                        <button type="button" className="btn btn-primary mx-2" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => { getOffer(c._id) }}>
                                            update
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => { handleDelete(c._id) }}>
                                            Delete
                                        </button>

                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                ) : (
                    <div className=' text-center'>
                        <h5>No Social links Yet! Please add </h5>
                    </div>
                )}
            </div>
        </>
    )
}

export default SocialMediaLinks
