import React, { useState } from 'react'
import axios from 'axios';
import './SignUp.css'
import HeadingComp from './HeadingComp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const history = useNavigate();

    const [input, setInput] = useState({ email: '', username: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/register`, input).then((res) => {
            if (res.data.message === 'User Already Exists') {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message);
                setInput({ email: '', username: "", password: "" })
                setTimeout(() => {
                    history('/signin');
                }, 1000);
            }

        });
    }

    return (
        <div className='signup'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 d-flex justify-content-center align-items-center column">
                        <div className='d-flex flex-column w-100 p-5'>
                            <input
                                className='p-2 my-3 inputSignUp'
                                type="email"
                                name="email"
                                placeholder='Enter your email'
                                onChange={change}
                                value={input.email}
                            />
                            <input
                                className='p-2 my-3 inputSignUp'
                                type="username"
                                name="username"
                                placeholder='Enter your Username'
                                onChange={change}
                                value={input.username}
                            />
                            <input
                                className='p-2 my-3 inputSignUp'
                                type="password"
                                name="password"
                                placeholder='Enter your Password'
                                onChange={change}
                                value={input.password}
                            />
                            <div>
                                <button className='signUpBtn' onClick={submit}>SignUp</button>
                            </div>
                        </div>
                    </div>
                    <HeadingComp first={'Sign'} second={'Up'} />
                </div>
            </div>
        </div>
    )
}
