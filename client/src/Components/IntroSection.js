import React, { useEffect, useState } from 'react'
import "../Assets/styles/services.css"
import toast from 'react-hot-toast';
import axios from 'axios';

const IntroSection = () => {
    const [intro, setIntro] = useState([])
    const [whatsapp, setWhatsapp] = useState([])

    // get Intro
    const getIntro = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/intro/get-intro`);
            if (data.success) {
                setIntro(data.intro)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong while getting intro");
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
        getIntro();
        getWhatsappLink();
    }, [])
    return (
        <>
            <div className="container">
                {intro?.map((c, index) =>
                    <>
                        <div className="grid grid-two--cols" key={index}>
                            <div className="image-container" >
                                <img src={require(`../Assets/images/${c.image}`)} alt=" for course" />
                            </div>
                            <div className="content-container">
                                <h1 className="section-common-heading">
                                    {c.title}
                                </h1>
                                <p className="services-para text-dark">
                                    {c.description}
                                </p>
                                <div>
                                    <a className="button" href={`https://wa.me/${whatsapp}`} target='_blank' rel="noopener noreferrer"> contact us</a>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default IntroSection
