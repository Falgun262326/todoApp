import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Update({ display, update }) {
    const [input, setInput] = useState({ title: '', body: '' });

    useEffect(() => {
        if (update) {
            setInput({
                title: update.title || '',
                body: update.body || ''
            });
        }
    }, [update]);

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = async () => {
        try {
            await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, input);
            display('none');
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
            <h3>Update Your Task</h3>
            <input type="text" className='todoInputs my-4 w-100 p-3' name="title" value={input.title} onChange={change} />
            <textarea className='todoUpdates w-100 p-3' name="body" value={input.body} onChange={change} />
            <div>
                <button className='btn btn-dark my-4' onClick={submit}>Update</button>
                <button className='btn btn-danger my-4 mx-4' onClick={() => { display('none') }}>Close</button>
            </div>
        </div>
    );
}
