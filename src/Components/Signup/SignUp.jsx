import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import Joi from "joi";
import axios from "axios";
export default function SignUp() {
    const navigate = useNavigate()
    //Data
    const [apiFlag, setApiFlag] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [ErrList, setErrList] = useState([]);
    const [APIRes, setAPIRes] = useState(null);

    //Functions
    function getUser(e) {
        setAPIRes(null);
        let newUser = { ...user };
        let data = e.target.value;
        newUser[e.target.id] = data;
        setUser(newUser);
        checkInputs(newUser, e);
    }
    function checkInputs(newUser, e) {
        const schema = Joi.object({
            userName: Joi.string().min(3).max(10).alphanum().required(),                    
            email: Joi.string()
                .required()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),
            password: Joi.string()
                .pattern(
                    new RegExp(
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                    )
                )
                .required()
                .messages({
                    "string.pattern.base":
                        "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character",
                }),
        });
        let joiResponse = schema.validate(newUser, { abortEarly: false });
        let inputField = e.target;
        if (joiResponse.error) {
            let errors = joiResponse.error.details;
            let errorFlag,
                i = 0;
            for (i = 0; i < errors.length; i++) {
                if (errors[i].context.label === inputField?.id) {
                    errorFlag = true;
                    break;
                }
            }

            if (errorFlag) {            
                setErrList([errors[i]]);
            } else {                
                setErrList([]);
            }
            if (inputField.value === "" && errorFlag) {
                console.log(errorFlag);
                setErrList([]);
            }
        } else {            
            setErrList([]);
        }
    }
    function getError(key) {
        for (const error of ErrList) {
            if (error.context.key === key) {
                return error.message;
            }
        }
        return "";
    }
    async function checkAPI(e) {
        e.preventDefault();
        if (ErrList.length !== 0) {
            setAPIRes("Invalid data");
            return;
        }
        setApiFlag(true);
        let result = await axios
            .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, user)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    setAPIRes(error?.response?.data?.message);
                    setApiFlag(false);
                }
            });
        if (result?.data?.message === "done") {
            setApiFlag(false);
            setAPIRes(null);
            navigate("/login");
        }
    }

    return (
        <div className="register">

            <main>
                <section class="section-login">
                    <div class="section-main">
                        <div class="section-login-1">
                            <div class="section-login-1-main">

                                <h1 class="section-login-1-title">GPTalk</h1>
                                <p class="section-login-1-text">
                                    <figure className='p-2 h6 text-center'>
                                        <blockquote class="blockquote">
                                            <p className='h6'>Communication is the lifeline of any relationship. Without it, the relationship is dead on arrival.</p>
                                        </blockquote>
                                        <figcaption class="blockquote-footer">
                                            Tony Gaskins
                                        </figcaption>
                                    </figure>
                                </p>
                                <div class="section-login-1-img">
                                    <img src="https://sourcesofinsight.com/wp-content/uploads/2022/10/Best-Motivational-Quotes.jpg" alt="motivate" />
                                </div>

                            </div>
                        </div>
                        <div class="section-login-2">
                            <div class="section-login-2-main bg-main">

                                <h1 class="section-login-2-title">Sign Up</h1>
                                <form onSubmit={checkAPI} class="section-login-2-form ">
                                    {APIRes ? (
                                        <div className="alert alert-danger"> {APIRes} </div>
                                    ) : (
                                        ""
                                    )}
                                    <div class="login-form-1">
                                        <label for="email">Email</label>
                                        <input type="text" id="email" onChange={getUser} placeholder="john@example.com" required />
                                        <p className="text-danger mb-2" id="email-">
                                            {getError("email")}
                                        </p>
                                    </div>
                                    <div class="login-form-2">
                                        <label for="userName">userName</label>
                                        <input type="text" onChange={getUser} id="userName" placeholder="johndoe" required />
                                        <p className="text-danger mb-2" id="userName-">
                                            {getError("userName")}
                                        </p>
                                    </div>
                                    <div class="login-form-3">
                                        <label for="password">Password</label>
                                        <input type="password" onChange={getUser} id="password" placeholder="At least 8 characters" required />
                                        <p className="text-danger mb-2" id="password-">
                                            {getError("password")}
                                        </p>
                                    </div>
                                    <div class="login-form-submit-btn">
                                    
                                        <button className={ErrList.length?"btn bg-secondary disabled":""}>{apiFlag?"Loading...":"Create An Account"}</button>
                                    </div>
                                    <div class="login-form-5">
                                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
