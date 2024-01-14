import React, { useEffect, useState } from 'react'
import "../../Assets/styles/footer.css"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [courses, setCourses] = useState([])
    const [socialMedia, setSocialMedia] = useState([])
    // getting courses
    const getCourses = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/courses/get-courses`);
            if (data.success) {
                setCourses(data.courses)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // getting social links
    const getSocialMedia = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/social-links/all-social-links`);
            if (data.success) {
                setSocialMedia(data.socialLinks)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCourses();
        getSocialMedia();
    }, [])
    return (
        <>
            <footer>
                <div className="container grid grid-three--cols">
                    <div className="footer-1--div">
                        <div className="logo-brand">
                            <a href="/" className="footer-subheading">ALBURHAN QURAN ACADEMY</a>
                        </div>
                        <p>Let's revolutionize the way you study with Al-burhan quran academy</p>
                        {socialMedia?.map((c, index) =>
                            <>
                                <div className="social-footer--icons" key={index}>
                                    <a href={c.whatsapp} target="_blank" rel="noopener noreferrer" alt="my discord server link">
                                        <i className="fa-brands fa-whatsapp" />
                                    </a>
                                    <a href={c.youtube} target="_blank" rel="noopener noreferrer" alt="my youtube channel link">
                                        <i className="fa-brands fa-youtube" />
                                    </a>
                                    <a href={c.facebook} target="_blank" rel="noopener noreferrer" alt="my instagram profile link">
                                        <i className="fa-brands fa-facebook" />
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="footer-2--div">
                        <p className="footer-subheading">  Courses </p>
                        <ul>
                            {courses?.map((c, index) =>
                                <>
                                    <li> <a href={`#${c._id}`} key={index}><i className="fa-regular fa-star"></i>  {c.title} </a> </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="footer-3--div">
                        <p className="footer-subheading"> Links</p>
                        <ul>
                            <li> <Link href="/"> Home </Link> </li>
                            <li> <Link to="/about"> About </Link> </li>
                            <li> <Link to="/courses"> Courses </Link> </li>
                            <li> <Link to="/contact"> contact </Link> </li>
                        </ul>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
