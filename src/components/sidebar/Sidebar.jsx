import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import ArchiveIcon from '@mui/icons-material/Archive';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Logo from "../../assets/images/favicon/google-keep.png";
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { SidebarToggle } = useSelector((state) => state.GoogleKeepReducer);
    const [activeItem, setActiveItem] = useState('Notes');

    const menuItems = [
        { name: 'Notes', icon: <LightbulbIcon className='!text-3xl' /> },
        { name: 'Archives', icon: <ArchiveIcon className='!text-3xl' /> },
        { name: 'Trash', icon: <RestoreFromTrashIcon className='!text-3xl' /> },
    ];

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className={` hover:!translate-x-[0%] bg-[#4B5945] mt-3 p-1 !rounded-e-lg shadow-xl transition-all duration-300 ease-in-out ${SidebarToggle ? 'opacity-100 sm:translate-x-0 w-64' : 'sm:translate-x-[-92%] translate-x-[-100%] w-64'} h-[calc(100%-11.3rem)] sm:h-[calc(100%-7.8rem)]  fixed top-[9.5rem] sm:top-24 !z-50`}>
            <div className="sidebar-logo text-center flex items-center justify-center mb-4 mt-4">
                <img src={Logo} alt="Logo" className='w-20' />
            </div>
            <ul className="m-0 p-4  page-scrollbar overflow-y-scroll h-[30%]">
                {menuItems.map((item) => (
                    <Link to={`${item.name.toLowerCase()}`} key={item.name} className='no-underline'>
                        <li className={`cursor-pointer mb-3 rounded-lg w-full px-2 py-2 flex items-center bg-[#4a5545] transition duration-300 ${activeItem === item.name ? 'bg-[#586552]' : 'hover:!bg-[#586552]'}`} onClick={() => handleItemClick(item.name)}>
                            <span className='text-[#B2C9AD]'><span className='px-2 text-[#B2C9AD]'>{item.icon}</span> {item.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;