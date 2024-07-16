import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

let id = sessionStorage.getItem('id');
let toUpdateArray = null; // Initialize to null or []

export default function Todo() {
    const [input, setInput] = useState({ title: "", body: "" });
    const [array, setArray] = useState([]);

    const show = () => {
        document.getElementById('textArea').style.display = 'block';
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${window.location.origin} /api/v2/getTask/${id}`);
            setArray(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = async () => {
        if (input.title.trim() === "" || input.body.trim() === "") {
            toast.error("Todo should not be empty");
        } else {
            if (id) {
                await axios.post(`${window.location.origin}/api/v2/addTask`, { title: input.title, body: input.body, id: id });
                fetchTodos();
                setInput({ title: "", body: "" });
                toast.success("Todo added successfully");
            } else {
                toast.error("Your task is not saved! Please sign in first!");
            }
        }
    };

    const del = async (taskId) => {
        try {
            await axios.delete(`${window.location.origin}/api/v2/deleteTask/${taskId}`);
            fetchTodos();
            toast.error("Todo deleted");
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const update = (value) => {
        toUpdateArray = array[value];
    }

    const dis = (value) => {
        document.getElementsByClassName('todoUpdate')[0].style.display = value;
    };

    useEffect(() => {
        if (id) {
            fetchTodos();
        }
    }, []);

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className="todoMain container d-flex justify-content-center align-items-center my-3 flex-column">
                    <div className='d-flex flex-column todoInputsDiv w-50 p-3'>
                        <input type="text" placeholder='TITLE' className='my-2 p-2 todoInputs' onClick={show} onChange={change} name='title' value={input.title} />
                        <textarea type="text" placeholder='BODY' className='p-2 todoInputs' id='textArea' onChange={change} name='body' value={input.body} />
                    </div>
                    <div className='d-flex justify-content-end align-items-center w-50'>
                        <button className='todoBtn' onClick={submit}>Add</button>
                    </div>
                </div>

                <div className="todoBody">
                    <div className="container-fluid">
                        <div className="row">
                            {array && array.map((item, index) =>
                                <div className="col-lg-3 col-10 mx-5 my-2" key={item._id}>
                                    <TodoCards
                                        title={item.title}
                                        body={item.body}
                                        id={item._id}
                                        delId={del}
                                        display={dis}
                                        updateId={index}
                                        toBeUpdated={update}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todoUpdate" style={{ display: 'none' }}>
                <div className="container">
                    <Update
                        display={dis}
                        update={toUpdateArray}
                    />
                </div>
            </div>
        </>
    );
}
