import React from 'react'

export default function HeadingComp(props) {
    return (
        <div className="col-lg-4 d-flex columnLeft justify-content-center align-items-center column">
            <h1 className='text-center signInHeading'>
                {props.first}<br />{props.second}
            </h1>
        </div>
    )
}
