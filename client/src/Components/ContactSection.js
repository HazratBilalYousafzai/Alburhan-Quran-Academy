import React, { useState } from 'react'
import "../Assets/styles/contact.css"
import toast from 'react-hot-toast'
import axios from 'axios'


const ContactSection = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/message/add-message`, { username, email, subject, message });
            if (res.data.success) {
                setTimeout(() => {
                    toast.success(res.data.message);
                }, 1000);
                setUsername("")
                setEmail("")
                setSubject("")
                setMessage("")
            } else {
                toast.error(res.data.message)
                console.log("error")
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }


    return (
        <>
            <div className="section-contact">
                <div className="contact-heading">
                    <h2 className="section-common-heading">Contact Us</h2><br />

                    <p className="section-common-subheading text-justify">
                        Get in touch with us. We are always here to help you.
                    </p>

                </div>
                <div className="container grid grid-two--cols">
                    <div className="contact-content">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-two--cols mb-3">
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" required autoComplete="off" placeholder="enter your name" />
                                </div>
                                <div>
                                    <label htmlFor="email">enter your email</label>
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required placeholder="abc@alburhan.com" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subject">subject</label>
                                <input type="text" name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="your main title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message">message</label>
                                <textarea name="message" id="message" cols={30} rows={10} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="enter your message" />
                            </div>
                            <div>
                                <button type="submit" className="button btn-submit">send message</button>
                            </div>
                        </form>
                    </div>
                    <div className="contact-map">
                        <iframe title='frame1' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1379.7260160218036!2d72.18756837108157!3d34.665813642580964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc1d28dcf5d193%3A0x3482822e21c9f23!2sMasjid%20Taqwa!5e0!3m2!1sen!2ssa!4v1698607155642!5m2!1sen!2ssa" height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactSection
