import React from 'react'
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import ProtectedHeader from './Protected Header';

const ProtectedLayout = () => {
    return (
        <div>
            <>
                <ProtectedHeader />
                <Outlet />
                <Footer />
            </>
        </div>
    )
}

export default ProtectedLayout;