import React, { useState } from 'react'
import './SignUp.css'
import HeadingComp from './HeadingComp'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

export default function SignIn() {

    const dispatch = useDispatch();

    const history = useNavigate();

    const [input, setInput] = useState({ email: '', password: "" });


    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/signin`, input).then((res) => {
            if (res.data.message === 'User not found' || res.data.message === 'Invalid Password') {
                toast.error(res.data.message);
            } else {
                sessionStorage.setItem("id", res.data.others._id)
                dispatch(authActions.logIn());
                history('/todo');
                setInput({ email: '', password: "" })
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        });
    }

    return (
        <div className='signup'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <HeadingComp first={'Sign'} second={'In'} />
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
                                type="password"
                                name="password"
                                placeholder='Enter your Password'
                                onChange={change}
                                value={input.password}
                            />
                            <div>
                                <button className='signUpBtn' onClick={submit}>SignIn</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
