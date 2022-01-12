import React,{useEffect,useState} from 'react'
import Image from '../assets/me.png';
import {onSnapshot,doc} from 'firebase/firestore';
import {db} from '../firebase'

function User({user,selectUser,user1,chat}) {
    const user2 = user?.uid;
    const [data,setdata] = useState('');

    useEffect(() => {
        const id = user1> user2 ? `${user1+user2}` : `${user2+user1}`;
        let unsub = onSnapshot(doc(db,'lastMsg',id),doc =>{
            setdata(doc.data());
        })
        return unsub();
    }, [])
    return (
        <div className= {`user_wrapper ${chat.name===user.name && "selected_user"} `} onClick={()=> selectUser(user)}> 
        {/* //chat is the selected user and 
        user is wha  we get from loop */}
            <div className="user_info">
                <div className="user_detail">
                    <img src={user.avatar || Image} alt="avatar" className='avatar'/>
                    <h4>{user.name}</h4>
                </div>
                <div className={`user_status ${user.isOnline ? "online":"offline"}`}></div>
            </div>
        </div>
    )
}

export default User;
