import React from 'react'
import Layout from "../Components/Layout/Layout";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <Layout title={"Page Not Found"}>
                <div className='pnf'>
                    <h1 className='pnf-title'>404</h1>
                    <h3 className='pnf-heading'>Oop ! Page not Found</h3>
                    <Link className='pnf-btn' to="/">Go Back</Link>
                </div>
            </Layout>
        </div>
    )
}

export default PageNotFound
