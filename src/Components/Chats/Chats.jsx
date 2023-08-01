import React, { useEffect, useState } from 'react'
import "./Chats.css"
import Avatar from '@mui/material/Avatar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

export default function Chats({ currentUser }) {
  const [chats, setChats] = useState('loading')

  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate()

  const getChats = async () => {

    const config = {
      headers: {
        authorization: process.env.REACT_APP_BEARER_KEY + localStorage.getItem("token"),
      },
    };
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/conversation/myChats`, config).catch(function (error) {
      if (error.response) {
        console.log(error.response);
        setChats(null)
      }
    });
    if (result?.data?.message === "done") {
      setChats(result.data.chats)
    } else {
      setChats(null)
    }

  }

  useEffect(() => {
    getChats()

  }, [])


  return (
    <div className="chats bg-main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5 col-md-4 col-lg-3 border-end  d-none d-sm-block">

            <div className="h1 py-3 msg-txt">Messages</div>

            <div className="input-group pb-3">
              <span className="input-group-text border-0 bg-chat" id="search-addon">
                <i className="fas fa-search "></i>
              </span>
              <input type="search" className="form-control bg-chat rounded-end" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
            </div>
            <div className="chats-view">


              <div className="all-chats mt-3">
                <div className="section-header d-flex align-items-center opacity-75 mb-2">
                  <i className="fa-solid fa-comments me-2"></i>
                  <h3 className='h6 my-0'>All Messages</h3>
                </div>
                <div className="section-chat">
                  {chats === "loading" ? <div className='text-center fa-xl mt-2 pt-4'><span>Loading...</span></div> :
                    chats === null ? <div><span>Something went wrong...</span></div> :
                      chats.length === 0 ? <div className='text-center'>
                        <span>Time to make new chats NOW!</span>
                        <Link to='/home'><button className='btn btn-outline-info mt-2'>Join Chats!</button></Link>
                        </div> :
                        chats.map((chat) => {                          
                          return <Link to={`${chat._id}`} key={chat._id} className="single-chat rounded-2 my-1 py-2 d-flex align-items-center justify-content-between">
                            <div className="avatar-name d-flex">
                              <Avatar alt={chat.users[0]._id === currentUser._id ? chat.users[1].userName : chat.users[0].userName} src="/static/images/avatar/2.jpg" />
                              <div className="chat-name ms-2 ">
                                <h4 className='h6 my-0'>{chat.users[0]._id === currentUser._id ? chat.users[1].userName : chat.users[0].userName}</h4>
                                <span className='opacity-50'>{chat.lastMessage?.sender?._id === currentUser._id ? "You: " : ""}{chat.lastMessage?.text ? chat.lastMessage.text.slice(0, 6) + "..." : ""}</span>

                              </div>
                            </div>
                            <div className="chat-data d-flex flex-column align-items-start justify-content-start">
                              <span className="msg-date  mb-3">{new Date(chat.lastMessage?.createdAt).getHours() > 12 ? new Date(chat.lastMessage?.createdAt).getHours() - 12 : new Date(chat.lastMessage?.createdAt).getHours()}{":" + (new Date(chat.lastMessage?.createdAt).getMinutes() + 1)} {new Date(chat.lastMessage?.createdAt).getHours() > 12 ? "PM" : "AM"}</span>
                              {chat.lastMessage?.isSeen || chat.lastMessage?.sender?._id === currentUser._id ? "" : <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>}
                            </div>

                          </Link>
                        }
                        )
                  }



                </div>

              </div>
            </div>

          </div>
          <div className="col-sm-7 col-md-8 col-lg-9 p-0 vh-100">
            <div className="d-block d-sm-none position-absolute top-0 end-0 p-2">
              <div onClick={() => { setOpenDrawer(true) }} className="d-flex d-sm-none rounded-4 p-2 shadow-sm border cursor-pointer justify-content-center chats-nav">
                <div className="opacity-75 d-flex align-items-center position-relative">
                  <DisplaySettingsIcon />                  
                  <span className='ms-1'>Chats</span>
                </div>
              </div>

            </div>
            <Outlet context={[getChats]} />
          </div>
        </div>


        <Drawer open={openDrawer} anchor={"left"} onClose={() => setOpenDrawer(false)}>
          <ListItem >
            <div className="bg-main" style={{ width: 200 }}>
              <div onClick={() => { setOpenDrawer(false) }} className="chats-view p-0">
                <div className="all-chats mt-3">
                  <div className="section-header d-flex align-items-center opacity-75 mb-2">
                    <i className="fa-solid fa-comments me-2"></i>
                    <h3 className='h6 my-0'>All Messages</h3>
                  </div>
                  <div className="section-chat">
                    {chats === "loading" ? <div><span>Loading...</span></div> :
                      chats === null ? <div><span>Something went wrong...</span></div> :
                        chats.length === 0 ? <div><span>Time to make new chats!</span></div> :
                          chats.map((chat) =>
                            <Link to={`${chat._id}`} key={chat._id} className="single-chat rounded-2 my-1 py-2 d-flex align-items-center justify-content-between">
                              <div className="avatar-name d-flex">
                                <Avatar alt={chat.users[0]._id === currentUser._id ? chat.users[1].userName : chat.users[0].userName} src="/static/images/avatar/2.jpg" />
                                <div className="chat-name ms-2 ">
                                  <h4 className='h6 my-0'>{chat.users[0]._id === currentUser._id ? chat.users[1].userName : chat.users[0].userName}</h4>
                                  <span className='opacity-50'>{chat.lastMessage?.sender?._id === currentUser._id ? "You: " : ""}{chat.lastMessage?.text ? chat.lastMessage.text.slice(0, 6) + "..." : ""}</span>

                                </div>
                              </div>
                              <div className="chat-data d-flex flex-column align-items-start justify-content-start">
                                <span className="msg-date  mb-3">{new Date(chat.lastMessage?.createdAt).getHours() > 12 ? new Date(chat.lastMessage?.createdAt).getHours() - 12 : new Date(chat.lastMessage?.createdAt).getHours()}{":" + (new Date(chat.lastMessage?.createdAt).getMinutes() + 1)} {new Date(chat.lastMessage?.createdAt).getHours() > 12 ? "PM" : "AM"}</span>
                                {chat.lastMessage?.isSeen || chat.lastMessage?.sender?._id === currentUser._id ? "" : <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>}

                              </div>

                            </Link>)
                    }



                  </div>

                </div>
              </div>

            </div>
          </ListItem>


        </Drawer>

      </div>
    </div>
  )
}
