import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard-layout flex h-screen">
            <div className={`transition-all duration-300`}>
                <Sidebar />
            </div>
            <div className="main-container flex flex-col flex-1">
                <Header />
                <Container className='bg-[#91AC8F]  rounded-lg mt-[10.5rem] sm:!mt-[7rem]'>
                    <Row>
                        <Outlet />
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
