import React from 'react'
// import Upload from '../assets/Upload'

export const MessageForm = ({handleSubmit,text,settext,setimg}) => {
    return (
        <form action="" className='message_form' onSubmit={handleSubmit}>
            {/* <label htmlFor="img">
                <Upload/>
            </label>
            <input type="file" id='img' accept='image/*' style={{display:"none"}} onChange={e=>setimg(e.target.files[0])}/> */}
            <div>
                <input type="text" placeholder='Enter message' value={text} onChange={e=>settext(e.target.value)}/>
            </div>
            <div>
                <button className="btn">Send</button>
            </div>
        </form>
    )
}
