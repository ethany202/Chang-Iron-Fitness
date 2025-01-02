import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar.tsx';

export default function Layout() {
    return (
        <div className="page-content">
            <Navbar />
            <Outlet />
        </div>
    )
}