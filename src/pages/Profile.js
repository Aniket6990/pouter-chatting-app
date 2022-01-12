import React , {useState,useEffect}from 'react';
import DelImage from '../assets/Image';
import Image from '../assets/me.png';
import Plus from '../assets/plus';
import { storage,db,auth } from '../firebase';
import {ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage';
import {getDoc,doc,updateDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const Profile = () => {
    const [img, setimg] = useState("");

    const [user, setuser] = useState();

    const history = useNavigate();

    useEffect(() => {
        getDoc(doc(db, 'users', auth.currentUser.uid )).then(docSnap => {
            if(docSnap.exists){
                setuser(docSnap.data());
            }
        });

        if(img){
            const uploadImg = async () => {
            const imgRef = ref(storage,`picture/${new Date().getTime()} - ${img.name}`); 

               try {
                if(user.avatarPath){
                    await deleteObject(ref(storage, user.avatarPath));
                }
                const uploadImage = await uploadBytes(imgRef, img);

                const url = await getDownloadURL(ref(storage, uploadImage.ref.fullPath));

                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    avatar : url,
                    avatarPath: uploadImage.ref.fullPath,
                });

                setimg("");
                
                console.log(url);
                console.log(uploadImage.ref.fullPath);

               } catch (err) {
                   console.log(err.message);
               }

            };
            uploadImg();
        }
    }, [img])
    console.log(img);

    const DeleteImage = async () =>{
        try {
            const confirm = window.confirm('Delete avatar?');
            if(confirm){
                await deleteObject(ref(storage, user.avatarPath));

                await updateDoc(doc(db, 'users', auth.currentUser.uid),
                {
                    avatar: '',
                    avatarPath: '',
                });
                history('/');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return user ? (
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={user.avatar || Image} alt="avatar"/>
                    <div className="overlay">
                        <div>
                            <label htmlFor="photo">
                                <Plus/>
                            </label>
                            {user.avatar ? <DelImage DeleteImage={DeleteImage}/>: null}
                            <input type="file" accept='image/*' style={{display: "none"}} id='photo' onChange={e=> setimg(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
                <div className="text_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <hr />
                    <small>Member Since: {user.createdAt.toDate().toDateString()}</small>                </div>
            </div>
        </section>
    ) : null;
}

export default Profile;