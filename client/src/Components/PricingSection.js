import React, { useEffect, useState } from 'react'
import "../Assets/styles/price-section.css"
import axios from 'axios'
import toast from 'react-hot-toast'

const PricingSection = () => {
    const [offers, setOffers] = useState([])

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
    return (
        <>
            <section className="pricing-section">
                <h1 className='section-common-heading' >Fee of Quran Courses</h1>
                <div className="price-container">
                    <div className="grid grid-3--cols">
                        {offers?.map((c, index) =>
                            <>
                                <div className="card" key={index}>
                                    <div className="title">
                                        <h1>{c.title}</h1>
                                    </div>
                                    <div className="price-section">
                                        <p className="tag">
                                            <span className="price">{c.price}</span>
                                            <span className="tenure">Monthly</span>
                                        </p>
                                    </div>
                                    <div className="offers-section">
                                        <div>
                                            <p><i className="fa-regular fa-circle-check"></i> {c.classDuration}</p>
                                        </div>
                                        <div>
                                            <p><i className="fa-regular fa-circle-check"></i> {c.daysInWeek}</p>
                                        </div>
                                        <div>
                                            <p><i className="fa-regular fa-circle-check"></i> {c.admissionFees}</p>
                                        </div>
                                        <div>
                                            <p><i className="fa-regular fa-circle-check"></i> {c.discount}</p>
                                        </div>
                                    </div>
                                    <div className='btn-section'>
                                        <button className="enrolled-btn">Enrolled Now</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section >
        </>
    )
}

export default PricingSection
