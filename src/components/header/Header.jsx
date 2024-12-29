import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Container, Col, Row } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAct, SidebarsrAct } from '../../services/action/GoogleKeepAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { AuthToggleAct, SignOutThunk } from '../../services/action/AuthAction';

const Header = () => {
    const { SearchToggle, SidebarToggle } = useSelector((state) => state.GoogleKeepReducer);
    const { AuthToggle } = useSelector((state) => state.AuthReducer);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(AuthToggleAct())
    }

    const handleSearch = () => {
        dispatch(SearchAct())
    }

    const SideBarToggle = () => {
        dispatch(SidebarsrAct())
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const UserLogOut = () => {
        dispatch(SignOutThunk());
        console.log("Logout");

    }

    return (
        <>
            <AppBar position="fixed" className='bg-transparent shadow-none mt-4 !z-40'>
                <Container>
                    <Row>
                        <Toolbar className='bg-[#4B5945] shadow-lg rounded-lg flex items-center flex-col flex-sm-row justify-center'>
                            <div className="sm-wrepper flex items-center justify-between w-full">
                                <Col lg={2}>
                                    <div className="logo-toggle flex items-center justify-start">
                                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" className='ms-1' onClick={SideBarToggle}>
                                            {SidebarToggle ? <MenuOpenIcon className='text-[#B2C9AD] !text-3xl' /> : <MenuIcon className='text-[#B2C9AD] !text-3xl' />}
                                        </IconButton>
                                        <div className="authbtn ms-2">
                                            {AuthToggle ? <Button className='!text-[#B2C9AD]' onClick={UserLogOut}><ToggleOnIcon className='text-[#B2C9AD] !text-3xl me-2' /> LogOut</Button> : <span className='flex items-center'><ToggleOffIcon className='text-[#B2C9AD] !text-4xl me-2' /> Login</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={2} className='  inline-block d-sm-none'>
                                    <div className="profile flex items-center justify-end">
                                        {AuthToggle && (
                                            <>
                                                <IconButton size="large" aria-label="account of current user" className='p-2' aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                </IconButton>
                                                <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                                    <div className="avatar mx-3 mb-3 flex items-center justify-center py-3">
                                                        <Avatar sx={{ width: 56, height: 56 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                        <div className="avatar-dis ps-3">
                                                            <h4 className='!text-[#B2C9AD] m-0'>Nilesh Paradva</h4>
                                                            <p className='p-0 m-0 !text-[#B2C9AD]'>nileshparadva97@gmail.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="account-part !border-b-2 mb-2 pb-2">
                                                        <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><AccountCircleIcon className='me-2 !text-[#353d33]' />Profile</MenuItem>
                                                        <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><AccountBoxIcon className='me-2 !text-[#353d33]' />My account</MenuItem>
                                                    </div>
                                                    <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><PersonAddIcon className='me-2 !text-[#353d33]' />Add Another Account</MenuItem>
                                                    <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><SettingsIcon className='me-2 !text-[#353d33]' />Setting</MenuItem>
                                                    <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><LogoutIcon className='me-2 !text-[#353d33]' />Log Out</MenuItem>
                                                </Menu>
                                            </>
                                        )}
                                    </div>
                                </Col>
                            </div>
                            <Col lg={8}>
                                <div className="menulist flex items-center !justify-center py-3">
                                    {/* <div className="imagelogo mx-2 d-none d-md-block">
                                        <img src={Logo} alt="" className='w-[40px]' />
                                    </div> */}
                                    <Button className='py-2 rounded-lg hover:!bg-[#586552] !bg-[#4a5545] me-2 !text-[#B2C9AD]' onClick={handleSearch}>
                                        <SearchIcon className='text-[#B2C9AD]' />
                                    </Button>
                                    <div className={`transition-all d-none d-sm-block duration-300 ease-in-out ${SearchToggle ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 overflow-hidden  lg-hidde'}`}>
                                        <input type="text" className='px-3 py-2 bg-transparent outline-none border-[#B2C9AD] border-b-2 border-t-2 rounded-lg placeholder:text-[#B2C9AD]' placeholder='Search...' />
                                    </div>
                                    <div className={`transition-all d-sm-none duration-300 ease-in-out`}>
                                        <input type="text" className='px-3 py-2 bg-transparent outline-none border-[#B2C9AD] border-b-2 border-t-2 rounded-lg placeholder:text-[#B2C9AD]' placeholder='Search...' />
                                    </div>
                                </div>
                            </Col>
                            <Col lg={2} className='d-none d-sm-block'>
                                <div className="profile flex items-center justify-end me-2">
                                    {AuthToggle && (
                                        <>
                                            <IconButton size="large" aria-label="account of current user" className='p-2' aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            </IconButton>
                                            <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                                <div className="avatar px-3 mb-3 flex items-center justify-center py-3">
                                                    <Avatar sx={{ width: 56, height: 56 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                    <div className="avatar-dis ps-3">
                                                        <h4 className='!text-[#B2C9AD] m-0'>Nilesh Paradva</h4>
                                                        <p className='p-0 m-0 !text-[#B2C9AD]'>nileshparadva97@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className="account-part !border-b-2 mb-2 pb-2">
                                                    <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><AccountCircleIcon className='me-2 !text-[#353d33]' />Profile</MenuItem>
                                                    <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><AccountBoxIcon className='me-2 !text-[#353d33]' />My account</MenuItem>
                                                </div>
                                                <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><PersonAddIcon className='me-2 !text-[#353d33]' />Add Another Account</MenuItem>
                                                <MenuItem onClick={handleClose} className='!text-[#B2C9AD]'><SettingsIcon className='me-2 !text-[#353d33]' />Setting</MenuItem>
                                                <MenuItem onClick={() => { handleClose(); UserLogOut() }} className='!text-[#B2C9AD]'><LogoutIcon className='me-2 !text-[#353d33]' />Log Out</MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </div>
                            </Col>
                        </Toolbar>
                    </Row>
                </Container>
            </AppBar>
        </>


    );
}

export default Header