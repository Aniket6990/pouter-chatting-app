import React,{useEffect,useState} from 'react'
import {db,auth} from '../firebase'; // for image support import storage
import {collection,query,where,onSnapshot, addDoc,Timestamp,orderBy,setDoc,doc,getDoc} from 'firebase/firestore';
import User from '../components/User';
import { MessageForm } from '../components/MessageForm';
// import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import Message from '../components/Message';
import Back from "../assets/back"
function Home() {
    const [users, setusers] = useState([]);

    const [chat, setchat] = useState("");

    const [text, settext] = useState("");
    // const [img, setimg] = useState("");

    const [msgs, setMsgs] = useState([]);

    const user1 = auth.currentUser.uid;

    useEffect(() => {
        const usersRef = collection(db,'users');
        // // //crearting a  query object
        const q = query(usersRef, where('uid','not-in', [user1]));

        // //executing the query
        const unsub = onSnapshot(q,(querySnapshot) =>{
            let users = [];
            querySnapshot.forEach(doc => {
                users.push(doc.data());
            });
            setusers(users);
        });
        return () => {
            unsub();
        }
    }, [user1]);

    const selectUser = async (user) => {
        setchat(user);

        const user2 = user.uid;
        const id = user1> user2 ? `${user1+user2}` : `${user2+user1}`;

        const msgRef = collection(db, 'messages', id, 'chat');
        const q = query(msgRef, orderBy('createdAt','asc'))

        onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(doc => {
                msgs.push(doc.data())
            })
            setMsgs(msgs)
        })
    }
    const handleSubmit = async e =>{
        e.preventDefault();

        const user2 = chat.uid;
        const id = user1> user2 ? `${user1+user2}` : `${user2+user1}`;

        // let url;
        // if(img) {
        //     const imgref = ref(storage, `images/${new Date().gettime()} - ${img.name}`);
        //     const snap = await uploadBytes(imgref, img);
        //     const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        //     url = dlurl
        // }

        await addDoc(collection(db,'messages',id,'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            // media: url || "",
        });

        await setDoc(doc(db,'lastMsg',id),{
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            unread : true
        })

        settext("");
    }
    return (
        <div className='home_container'>
            <div className="users_container">
                {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat}/>)}
            </div>
            <div className="messages_container">
                {chat ? (
                    <>
                    {/* <div className="messages_user">
                        <h3>{chat.name}</h3>
                    </div> */}
                    <div className="messages">
                        {msgs.length ? msgs.map((msg,i) => <Message key={i} msg={msg} user1={user1}/>):null}
                    </div>
                    <div><MessageForm handleSubmit={handleSubmit} text={text} settext={settext}/></div>
                    </>
                ):(
                    <h3 className='no_conv'><Back/> Select a friend to chat</h3>
                )}
            </div>
        </div>
    )
}

export default Home;
