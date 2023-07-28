import React, { useEffect } from 'react'
import "./Groups.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';




export default function Groups({}) {

  useEffect(() => {
    let element = document.querySelector('.chat-page');
    element.scrollTop = element.scrollHeight;
    }, [])

  return (
    <div className="chats light-mode bg-main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5 col-md-4 col-lg-3 chats-view  border-end">

            <div className="h1 py-3 light-mode msg-txt">Messages</div>

            <div className="input-group pb-3">
              <span className="input-group-text border-0 light-mode bg-chat" id="search-addon">
                <i className="fas fa-search "></i>
              </span>
              <input type="search" className="form-control light-mode bg-chat rounded-end" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
            </div>

            <div className="pinned">
              <div className="section-header d-flex align-items-center opacity-75 mb-2">
                <i className="fa-solid fa-location-dot me-2"></i>
                <h3 className='h6 my-0'>Pinned Groups</h3>
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

            </div>
            <div className="all-chats mt-3">
              <div className="section-header d-flex align-items-center opacity-75 mb-2">
                <i className="fa-solid fa-comments me-2"></i>
                <h3 className='h6 my-0'>All Groups</h3>
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

            </div>

          </div>
          <div className="col-sm-4 col-md-5 col-lg-6 p-0  border-end">
            <div className="d-flex flex-column vh-100">
              <div className="chat-header p-3 fa-2x">
                <div className="d-flex align-items-center">
                  <Avatar>G</Avatar>
                  <div className="chat-content ms-2">
                    <h4 className=' m-0'>Chat Name</h4>

                  </div>
                </div>
              </div>
              <div className="chat-page light-mode bg-nav chats-view">
                <div className="out-message p-3 py-2">
                  <div className="d-flex align-items-center">
                    <Avatar>P</Avatar>
                    <span className='ms-2 light-mode bg-main p-2 rounded'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo sapiente consequuntur provident suscipit. Fuga maxime beatae assumenda optio placeat culpa ipsam eveniet velit, quas ipsum harum deserunt similique sint quos?</span>
                  </div>
                </div>
                <div className="my-message p-3 py-2 ">
                  <div className="d-flex align-items-center  justify-content-end">
                    <span className='me-2 bg-msg p-2 rounded'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo sapiente consequuntur provident suscipit. Fuga maxime beatae assumenda optio placeat culpa ipsam eveniet velit, quas ipsum harum deserunt similique sint quos?</span>
                    <Avatar>P</Avatar>
                  </div>
                </div>
                <div className="my-message p-3 py-2">
                  <div className="d-flex align-items-center justify-content-end">
                    <span className='me-2 bg-msg p-2 rounded'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, saepe.</span>
                    <Avatar>P</Avatar>
                  </div>
                </div>
                <div className="out-message p-3 py-2">
                  <div className="d-flex align-items-center">
                    <Avatar>P</Avatar>
                    <span className='ms-2 light-mode bg-main p-2 rounded'>Lorem ipsum dolor sit amet.</span>
                  </div>
                </div>
              </div>
              <div className="sender light-mode bg-main p-3 pb-1">
                <div className="input-group pb-3">
                  <input type="search" className="form-control light-mode bg-chat rounded-end" placeholder="Type your message..." aria-label="Search" aria-describedby="search-addon" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-5 col-lg-3 p-0  border-end p-3">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="grp-info d-flex flex-column align-items-center justify-content-center">
                <Avatar>G</Avatar>
                <h5>Group Name</h5>
                <span>Created By : ahmed essam</span>
              </div>
              <div className="accordion  mt-3 w-100" id="accordionPanelsStayOpenExample">
                <div className="accordion-item members">
                  <h2 className="accordion-header " id="panelsStayOpen-headingOne">
                    <button className="accordion-button bg-nav light-mode w-100" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                      Members
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body bg-main light-mode">
                      <div className="add-new p-2 rounded  d-flex align-items-center">
                        <div className="p-2 bg-chat me-2 light-mode rounded-circle">
                          <AddIcon color="primary" />
                        </div>
                        <span className='h5'>Add Member</span>
                      </div>
                      <div className="member rounded-2 my-1 py-2 d-flex align-items-center justify-content-between">
                        <div className="avatar-name d-flex align-items-center">
                          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                          <h4 className='h6 my-0 ms-2'>My Name</h4>
                        </div>
                        <Button variant="outlined" color="error">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
