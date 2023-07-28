import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
      console.log(result.data)
      setJoin(false)

      navigate(`/chats/${result.data.conversation._id}`);
    }

  }
  return (
    <div className='bg-main h-100'>
      <div className="container">
        <h1>Welcome {currentUser?.userName} to GPTalk!</h1>
        <h2>Your ID is: {currentUser?._id}</h2>

        <label htmlFor="newChat">Join New Chat</label>
        <input className='form-control' type="text" id='newChat' placeholder="Type the User's ID..." />
        <button onClick={joinChat} className='btn btn-primary ms-auto my-2 '>{join ? "loading..." : "Join"}</button>
      </div>
    </div>
  )
}
