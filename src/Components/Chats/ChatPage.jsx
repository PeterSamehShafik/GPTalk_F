import React, { useEffect, useState } from 'react'
import "./Chats.css"
import Avatar from '@mui/material/Avatar';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import { socket } from './../../socket';

export default function ChatPage({ currentUser }) {
    const [messages, setMessages] = useState(null)
    const [recipient, setRecipient] = useState(null)
    const { id } = useParams();
    const [getChats] = useOutletContext();


    const getMessages = async () => { //display chat
        socket.emit("joinRoom", id)
        const config = {
            headers: {
                authorization: process.env.REACT_APP_BEARER_KEY + localStorage.getItem("token"),
            },
        };
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/conversation/chat/${id}`, config).catch(function (error) {
            if (error.response) {
                console.log(error.response);
                setMessages(null)
            }
        });
        if (result?.data?.message === "done") {
            setMessages(result.data.messages)
            setRecipient(result.data.recipient)
            let element = document.querySelector('.chat-page');
            if (element) {
                element.scrollTop = element.scrollHeight;
            }
        } else {
            setMessages(null)
        }

    }
    const sendMessage = async (e) => {

        const msg = document.getElementById("msg")
        socket.emit("sendMessage", id)

        e.preventDefault()
        const config = {
            headers: {
                authorization: process.env.REACT_APP_BEARER_KEY + localStorage.getItem("token"),
            },
        };
        const data = {
            text: msg.value,
            recipientId: recipient._id
        }
        msg.value = ""
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/message/${id}/send/`, data, config).catch(function (error) {
            if (error.response) {
                console.log(error.response);

            }
        });

        if (result?.data?.message === "done") {
            getMessages()
        } else {
            console.log("went wrong")
        }

    }
    let element = document.querySelector('.chat-page');
    if (element) {
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {    
        socket.on("displayChat", async() => {            
            await getMessages()
            await getChats()
        })
        return () => {
            socket.off("displayChat")
        }
    }, [])



    return (
        <div className="d-flex flex-column vh-100">
            <div className="chat-header p-3 fa-2x ">
                <div className="d-flex align-items-center">
                    <Avatar>{recipient?.userName[0]}</Avatar>
                    <div className="chat-content ms-2">
                        <h4 className='text-capitalize m-0'>{recipient?.userName}</h4>

                    </div>
                </div>
            </div>
            <div className="chat-page bg-nav chats-view">
                {messages?.map((msg) => {
                    if (msg.sender._id === currentUser._id) {
                        return <div key={msg._id} className="my-message msg p-1 py-2 ">
                            <div className="d-flex align-items-center bg-chat p-2 rounded-2 justify-content-end">
                                <span className='opacity-50 me-auto '>{new Date(msg.createdAt).getHours() > 12 ? new Date(msg.createdAt).getHours() - 12 : new Date(msg.createdAt).getHours()}{":" + (new Date(msg.createdAt).getMinutes() + 1)} {new Date(msg.createdAt).getHours() > 12 ? "PM" : "AM"}</span>
                                <span className='me-2 bg-msg p-2 rounded'>{msg.text}</span>
                                <Avatar>{currentUser.userName[0]}</Avatar>
                            </div>
                        </div>
                    } else {
                        return <div key={msg._id} className="out-message msg  p-1 py-2">
                            <div className="d-flex align-items-center bg-chat p-2 rounded-2">
                                <Avatar>{msg.recipient.userName[0]}</Avatar>
                                <span className='ms-2 bg-main p-2 rounded'>{msg.text}</span>
                                <span className='opacity-50 ms-auto '>{new Date(msg.createdAt).getHours() > 12 ? new Date(msg.createdAt).getHours() - 12 : new Date(msg.createdAt).getHours()}{":" + (new Date(msg.createdAt).getMinutes() + 1)} {new Date(msg.createdAt).getHours() > 12 ? "PM" : "AM"}</span>
                            </div>
                        </div>
                    }
                }
                )}

            </div>
            <div className="sender bg-main p-3 pb-1">
                <div className="input-group pb-3">
                    <form className='w-100' onSubmit={sendMessage}>
                        <input id="msg" type="search" className="form-control bg-chat rounded-end" placeholder="Type your message..." aria-label="Search" aria-describedby="search-addon" />

                    </form>
                </div>
            </div>
        </div>
    )
}
