import { createContext, useState,useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [User, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (User)=>{
            setUser(User);
            setloading(false)
        });
    }, []);
    if(loading){
        return <Loading/>;
    }
    return(
        <AuthContext.Provider value={{User}}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;