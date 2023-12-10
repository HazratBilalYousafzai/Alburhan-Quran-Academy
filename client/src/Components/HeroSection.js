import React, { useEffect, useState } from 'react'
import "../Assets/styles/heroSection.css"
import axios from 'axios'
import toast from 'react-hot-toast'
const HeroSection = () => {
    const [carousels, setCarousels] = useState([])

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
    return (
        <>
            <section>
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to={0} className="active Slide" aria-current="true" aria-label="Slide 1" />
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to={1} aria-label="Slide 2" className='Slide' />
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to={2} aria-label="Slide 3" className='Slide' />
                    </div>
                    <div className="carousel-inner">
                        {carousels?.map((c, index) =>
                            <>
                                <div className={(index === 0) ? "carousel-item active" : "carousel-item"} >
                                    <img src={require(`../Assets/images/${c.image}`)} className="d-block w-100" alt="..." />
                                    <div className="carousel-caption text-field">
                                        <h5>{c.author} </h5>
                                        <p>{c.sayings}</p>
                                    </div>
                                </div>
                            </>
                        )}
                        <button className="carousel-control-prev Slide" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next Slide" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HeroSection
