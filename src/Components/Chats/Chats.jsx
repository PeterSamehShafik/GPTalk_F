import React, { useEffect, useState } from 'react'
import "./Chats.css"
import Avatar from '@mui/material/Avatar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Chats({ currentUser }) {
  const [chats, setChats] = useState('loading')
  const [goTo, setGoTo] = useState(null)
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

              {/* <div className="pinned">
                <div className="section-header d-flex align-items-center opacity-75 mb-2">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <h3 className='h6 my-0'>Pinned Messages</h3>
                </div>
                <div className="section-chat">
                  <div className="single-chat rounded-2 my-1 py-2 d-flex align-items-center justify-content-between">
                    <div className="avatar-name d-flex">
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <div className="chat-name ms-2 ">
                        <h4 className='h6 my-0'>My Name</h4>
                        <span className='opacity-50'>Lorem, ipsum dolor.</span>

                      </div>
                    </div>
                    <div className="chat-data d-flex flex-column align-items-start justify-content-start">
                      <span className="msg-date fa-xs mb-3">10:20 PM</span>
                      <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>

                    </div>

                  </div>
                  <div className="single-chat my-1 py-2 d-flex align-items-center justify-content-between">
                    <div className="avatar-name d-flex">
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <div className="chat-name ms-2">
                        <h4 className='h6 my-0'>My Name</h4>
                        <span className='opacity-50'>Lorem, ipsum dolor.</span>

                      </div>
                    </div>
                    <div className="chat-data d-flex flex-column align-items-start justify-content-start">
                      <span className="msg-date fa-xs mb-3">10:20 PM</span>
                      <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>

                    </div>

                  </div>
                  <div className="single-chat my-1 py-2 d-flex align-items-center justify-content-between">
                    <div className="avatar-name d-flex">
                      <Avatar>H</Avatar>
                      <div className="chat-name ms-2">
                        <h4 className='h6 my-0'>My Name</h4>
                        <span className='opacity-50'>Lorem, ipsum dolor.</span>

                      </div>
                    </div>
                    <div className="chat-data d-flex flex-column align-items-start justify-content-start">
                      <span className="msg-date fa-xs mb-3">10:20 PM</span>
                      <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>

                    </div>

                  </div>


                </div>

              </div> */}
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
                              <span className="msg-date fa-xs mb-3">10:20 PM</span>
                              {chat.lastMessage?.isSeen || chat.lastMessage?.sender?._id === currentUser._id ? "" : <div className='new-msg px-2 py-1 rounded-circle ms-auto '>+</div>}

                            </div>

                          </Link>)
                  }



                </div>

              </div>
            </div>

          </div>
          <div className="col-sm-7 col-md-8 col-lg-9 p-0 vh-100">
            <Outlet context={[getChats]} />
          </div>
        </div>

      </div>
    </div>
  )
}
