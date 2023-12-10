import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminHeader = () => {
    return (
        <>
            <nav className='admin-navbar '>
                <div>
                    <ul className="nav-links " >
                        <li><NavLink to='/dashboard/intro'>Intro</NavLink></li>
                        <li><NavLink to='/dashboard/carousel'>Carousel</NavLink></li>
                        <li><NavLink to='/dashboard/courses'>Courses</NavLink></li>
                        <li><NavLink to='/dashboard/massages'>Massages</NavLink></li>
                        <li><NavLink to='/dashboard/price'>Prices</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default AdminHeader
