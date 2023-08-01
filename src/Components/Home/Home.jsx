import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Home({ currentUser }) {
  const [join, setJoin] = useState(false)
  const navigate = useNavigate()
  const joinChat = async () => {
    setJoin(true)
    const newId = document.getElementById("newChat").value
    const config = {
      headers: {
        authorization: process.env.REACT_APP_BEARER_KEY + localStorage.getItem("token"),
      }
    };
    const data = {
      user1Id: currentUser._id,
      user2Id: newId
    }
    let result = await axios.post(`${process.env.REACT_APP_BASE_URL}/conversation/new`, data, config).catch(function (error) {
      if (error.response) {
        console.log(error.response);
        setJoin(false)

      }
    });
    if (result?.data?.message == "done") {
      // console.log(result.data)
      setJoin(false)

      navigate(`/chats/${result.data.conversation._id}`);
    }

  }
  return (
    <>

      {currentUser ?
        <main className='bg-main vh-100 p-4 home'>
          <div className="container" >
            <div className="content d-flex flex-column justify-content-center">

              <p className='welcome text-center'>
                Welcome
                <span>
                  {currentUser?.userName}
                </span>
                &mdash; to GPTalk! &mdash;
              </p>

              <div className="home-content mt-2 border shadow p-5">
                <h2>Your ID is: {currentUser?._id}</h2>
                <label htmlFor="newChat">Join New Chat</label>
                <input className='form-control' type="text" id='newChat' placeholder="Type the User's ID..." />
                <Button
                  onClick={joinChat}
                  color="success" size="large"
                  variant="contained" endIcon={<SendIcon />}>
                  {join ? "loading..." : "Join"}
                </Button>
                <Link to='/chats'>
                  <Button
                    className='m-2'
                    onClick={joinChat}
                    color="secondary" size="large"
                    variant="contained">
                    Your Chats
                  </Button>
                </Link>

              </div>
            </div>
          </div >
        </main >
        : "Loading..."
      }

    </>

  )
}
