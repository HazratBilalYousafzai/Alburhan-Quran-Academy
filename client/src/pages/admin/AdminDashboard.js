import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminHeader from '../../Components/Layout/AdminHeader';
import SocialMediaLinks from '../../Components/adminComponents/SocialMediaLinks';
import User from '../../Components/adminComponents/User';

const AdminDashboard = () => {

    return (
        <Layout title="Admin Dashboard">
            <AdminHeader />
            <SocialMediaLinks />
            <User />

        </Layout>
    )
}

export default AdminDashboard