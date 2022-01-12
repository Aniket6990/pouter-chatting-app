import React,{useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {auth,db} from '../firebase';
import {signOut} from 'firebase/auth';
import {updateDoc,doc} from 'firebase/firestore';
import {AuthContext} from '../context/auth';
import PrivateRoute from './PrivateRoute';
function Navbar() {
    const history = useNavigate();

    const {User} = useContext(AuthContext);

    const handleSignout = async () =>{
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
            isOnline: false,
        });
        await signOut(auth);
        history('/login');
    };
    return (
        <nav>
            <h3>
            <Link to={User ? "/": <PrivateRoute/>}>Pouter</Link>
                {/* Pouter  */}
                {/* <Link to="/">Pouter</Link> */}
            </h3>
            <div>
                {User ? (
                <>
                <Link to = "/profile">Profile</Link>
                <button className="btn" onClick={handleSignout}>Logout</button>
                </>)
                :
                (
                <>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
