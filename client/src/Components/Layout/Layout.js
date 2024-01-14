import React from 'react'
import Header from './Header'
import { Helmet } from "react-helmet"
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';

const Layout = ({ children, description, title, author, keyword }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </>
    )
}
Layout.defaultProps = {
    title: "E-commerce - shop now",
    description: "this site is an quran learning academy website build by bilal yousafzai",
    keyword: "quran,nazra and tajweed,hifiz e quran, quran translation, quran tafseer,ahadees and sunnah, masnoon duain,arabic language",
    author: "Bilal Yousafzai"
};

export default Layout
