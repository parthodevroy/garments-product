import React from 'react';
import Logo from '../component/Logo';
import { Link, Outlet } from 'react-router';
import img from "../assets/authImage.png"

const MainLayOut = () => {
    return (
        <div className='max-w-7xl bg-amber-50 pt-4  mx-auto'>
           <div className='max-w-6xl mx-auto'> <Link to={"/"}><Logo/></Link></div>
            <div className='flex items-center'>
                <div className='flex-1'><Outlet/></div>
                <div className='flex-1 h-screen bg-[#c5e494]'>
                    <img src={img} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default MainLayOut;
