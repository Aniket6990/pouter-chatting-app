import React from 'react'

function Plus() {
    return (
        <svg className="w-6 h-6"
        fill="none" stroke="currentColor"
        viewBox="0 0 24 24"
        style={{width: "25px", height:"25px", cursor:"pointer",color:"cyan"}}
        xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

export default Plus;
