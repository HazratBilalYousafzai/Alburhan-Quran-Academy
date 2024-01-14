import React, { useEffect, useState } from 'react'
import '../Assets/styles/services.css'
import toast from 'react-hot-toast'
import axios from 'axios'

const Services = ({ margin }) => {
    const [courses, setCourses] = useState([])
    const [whatsapp, setWhatsapp] = useState([])

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

    // getting whatsapp links
    const getWhatsappLink = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/social-links/all-social-links`);
            if (data.success) {
                setWhatsapp(data.socialLinks[0].whatsapp)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting social links");
        }
    }
    useEffect(() => {
        getCourses();
        getWhatsappLink();
    }, [])
    return (
        <>
            <section style={{ marginTop: margin }}>
                <h1 className='section-common-heading' style={{ margin: 40 }}>Courses we offers</h1>
                {courses?.map((c, index) =>
                    <>
                        <div className="container even-container" id={c._id}>
                            <div className="grid grid-two--cols">
                                <div className="image-container" >
                                    <img src={require(`../Assets/images/${c.image}`)} alt={c.image} />
                                </div>
                                <div className="content-container">
                                    <h1 className="section-common-heading">
                                        {c.title}
                                    </h1>
                                    <p className="services-para">
                                        {c.description}
                                    </p>
                                    <div>
                                        <a className="button" href={`https://wa.me/${whatsapp}`} target='_blank' rel="noopener noreferrer"> contact us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section >

        </>
    )
}

export default Services
