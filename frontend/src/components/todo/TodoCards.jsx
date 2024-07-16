import React from 'react';
import { MdDelete, MdEdit } from "react-icons/md";

export default function TodoCards({ title, body, id, delId, display, updateId, toBeUpdated }) {
    return (
        <div className='p-3 todoCard'>
            <div>
                <h5>{title}</h5>
                <p className='' style={{ marginTop: '1.5em', textAlign: 'justify' }}>{body}</p>
            </div>
            <div className="d-flex justify-content-end">
                <div className='cardIcons mx-2 d-flex justify-content-center align-items-center' onClick={() => { display('block'); toBeUpdated(updateId) }}>
                    <MdEdit />
                </div>
                <div className='cardIcons del d-flex justify-content-center align-items-center' onClick={() => delId(id)}>
                    <MdDelete />
                </div>
            </div>
        </div>
    );
}
