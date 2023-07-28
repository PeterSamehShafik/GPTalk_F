import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Avatar from '@mui/material/Avatar';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';


export default function Navbar({ darkMode, mode, currentUser, logout }) {
    const [pathName, setPathname] = useState(null)
    const location = useLocation()
    const [open, setOpen] = useState(false);
    //snack
    const [openSnack, setOpenSnack] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    useEffect(() => {
        setPathname(location.pathname.toLowerCase())
    }, [])

    return <>

        <nav className=' bg-nav h-100'>

            <div className="d-flex flex-column align-items-between h-100 justify-content-center">
                <div onClick={darkMode} className="nav-item rounded-4 p-3 shadow-sm border mx-auto align-self-start mt-2">
                    {/* <i className={mode==="light"?"fa-solid fa-moon opacity-75 icon":"fa-solid fa-suns opacity-75 icon"}></i> */}
                    <div className="opacity-75">
                        {mode === 'light' ? <Brightness3Icon /> : <Brightness7Icon />}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    {currentUser ? <>
                        <Link to='/' onClick={() => setPathname("/")}>
                            <div className={pathName === '/' ? "nav-item my-2  rounded-4 p-3 shadow-sm border active" : "nav-item my-2  rounded-4 p-3 shadow-sm border "}>
                                <div className="opacity-75">
                                    <HomeIcon />
                                </div>
                            </div>
                        </Link>
                        <Link to='/chats' onClick={() => setPathname("chats")}>
                            <div className={pathName?.includes('chats') ? "nav-item my-2  rounded-4 p-3 shadow-sm border active" : "nav-item my-2  rounded-4 p-3 shadow-sm border "}>
                            <div className="opacity-75">
                                <ChatIcon />
                            </div>
                            </div>
                        </Link>
                        {/* <Link to='/groups' onClick={() => setOpenSnack(true)}> */}
                        <div onClick={() => setOpenSnack(true)} className={pathName?.includes('groups') ? "nav-item my-2  rounded-4 p-3 shadow-sm border active" : "nav-item my-2  rounded-4 p-3 shadow-sm border "}>
                            <div className="opacity-75">
                                <GroupIcon />
                            </div>
                        </div>
                        {/* </Link> */}
                        <div onClick={() => { setOpen(true) }} className="nav-item my-2  d-flex d-sm-none rounded-4 p-3 shadow-sm border ">
                        <div className="opacity-75">
                                <DisplaySettingsIcon />
                            </div>
                        </div>
                    </>
                        : <>
                            <Link to='/login' onClick={() => setPathname("login")}>
                                <div className={pathName?.includes('login') ? "nav-item my-2  rounded-4 p-3 shadow-sm border active" : "nav-item my-2  rounded-4 p-3 shadow-sm border "}>
                                    <div className="opacity-75">
                                        <LoginIcon />
                                    </div>
                                </div>
                            </Link>
                            <Link to='/signup' onClick={() => setPathname("signup")}>
                                <div className={pathName?.includes('signup') ? "nav-item my-2  rounded-4 p-3 shadow-sm border active" : "nav-item my-2  rounded-4 p-3 shadow-sm border "}>
                                    <div className="opacity-75">
                                        <VpnKeyIcon />
                                    </div>
                                </div>
                            </Link>
                        </>}

                </div>
                <div className="profile mx-auto cursor-pointer mb-2">
                    {currentUser ? <>
                        <div className="dropdown">
                            <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Avatar>{currentUser.userName[0]}</Avatar>
                            </span>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item logout" onClick={logout}>Logout</span></li>

                            </ul>
                        </div>

                    </> :
                        <Avatar>?</Avatar>}

                </div>
            </div>
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                <ListItem >
                    <div className=" bg-main" style={{ width: 200 }}>
                        <div onClick={() => { setOpen(false) }} className="single-chat rounded-2 my-1 py-2 d-flex align-items-center justify-content-between">
                            <div className="avatar-name d-flex align-items-center">
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <div className="chat-name ms-2 ">
                                    <h4 className='h6 my-0'>My Name</h4>
                                </div>
                            </div>
                            <div className="chat-data d-flex flex-column align-items-start justify-content-start">
                                <span className="msg-date fa-xs mb-3">10:20 PM</span>
                                <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>

                            </div>

                        </div>

                    </div>
                </ListItem>


            </Drawer>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => { setOpenSnack(false) }} severity="info" sx={{ width: '100%' }}>
                    Soon!
                </Alert>

            </Snackbar>
        </nav>

    </>
}
