import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import Chats from './Components/Chats/Chats';
import { useState, useEffect } from 'react';
import Groups from './Components/Groups/Groups';
import Home from './Components/Home/Home';
import SignUp from './Components/Signup/SignUp';
import Login from './Components/Login/Login.jsx';
import axios from 'axios';
import ChatPage from './Components/Chats/ChatPage.jsx';

function App() {
  const [mode, setMode] = useState('light')
  const navigate = useNavigate()


  function ProtectedRoute(props) {
    if (localStorage.getItem("token")) {
      return props.children;
    }
    else {
      return <Navigate to='/login' />
    }
  }
  function ProtectedLogin(props) {
    if (!(localStorage.getItem("token"))) {
      return props.children;
    }
    else {
      return <Navigate to='/home' />
    }
  }

  const [currentUser, setCurrentUser] = useState(null);
  async function validateLogin() {
    const config = {
      headers: {
        authorization: process.env.REACT_APP_BEARER_KEY + localStorage.getItem("token"),
      }
    };
    let result = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`, config).catch(function (error) {
      if (error.response) {
        console.log(error.response);
      }
    });
    if (result?.data?.message == "done") {
      setCurrentUser(result.data.user);
    } else {
      localStorage.removeItem("token");
      setCurrentUser(null);
    }

  }
  async function logout() {
    const config = {
      headers: {
        authorization: process.env.REACT_APP_BEARER_KEY + localStorage.getItem("token"),
      }
    };
    let result = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/signout`, config).catch(function (error) {
      if (error.response) {
        console.log(error.response);
      }
    });
    if (result?.data?.message == "done") {
      localStorage.removeItem("token");
      navigate('/login');
      setCurrentUser(null);
    } else {
      alert("Failed to log out")
    }

  }

  const darkMode = () => {
    const app = document.getElementsByTagName("body")[0]
    if (mode === 'light') {
      setMode("dark")
      app.classList.add("dark-mode")
      app.classList.remove("light-mode")
    } else {
      setMode("light")
      app.classList.add("light-mode")
      app.classList.remove("dark-mode")
    }
  }

  useEffect(() => {
    // isLogin()
    if (localStorage.getItem("token")) {
      validateLogin();
    }
  }, [])
  return (
    <div className="App" id="app">
      <div className='container-fluid p-0'>
        <div className='my-row d-flex'>

          <div className='col-half p-0 vh-100'>
            <Navbar darkMode={darkMode} mode={mode} currentUser={currentUser} logout={logout} />
          </div>


          <main className='col-11-half p-0'>
            <Routes>
              <Route path='' element={<ProtectedRoute><Home currentUser={currentUser} /></ProtectedRoute>} />
              <Route path='/chats' element={<ProtectedRoute><Chats currentUser={currentUser} /></ProtectedRoute>}>
                <Route
                  path=""
                  element={<>
                    <div className='mt-3 ms-3' >
                    <span className='fa-xl'>Enter your chat now!</span>
                    </div>
                    <div className='position-relative top-50'>
                      <div className="loader"></div>
                      <div className="loader2"></div>
                      <div className="loader3"></div>

                    </div>
                  </>}
                />
                <Route
                  path=":id"
                  element={<ChatPage currentUser={currentUser} />}
                />
              </Route>
              <Route path='/groups' element={<Navigate to='/chats' />} />
              <Route path='/signup' element={<ProtectedLogin> <SignUp /></ProtectedLogin>} />
              <Route path='/Login' element={<ProtectedLogin> <Login validateLogin={validateLogin} /></ProtectedLogin>} />
              <Route path='*' element={<div>404</div>} />
            </Routes>
          </main>

        </div>
      </div>

    </div>
  );
}

export default App;
