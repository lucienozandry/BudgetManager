import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./views/user/auth/login";
import NavBar from "./views/partials/navbar";
import Home from "./views/user/home";
import Logout from "./views/user/auth/logout";
import backend from "./config/functions/backend";
import { LoadingPage } from "./views/partials/elements/loading";
import  Signup  from "./views/user/auth/signup";
import Settings from "./views/user/settings";

export const AuthContext = React.createContext({})

export default function App() {
    const [Auth, setAuth] = React.useState({state : false, user : null});
    const [loading, setLoading] = React.useState(false);

    const location = useLocation();
    
    React.useEffect(() => {
        setLoading(true);
        backend('/')
            .then(response => {
                    setLoading(false);
                const {authenticated, user} = response.data;
                authenticated ? 
                    setAuth({...Auth, state : authenticated, user : user}) :
                    setAuth({...Auth, state : false, user : {}});
            })
    }, [])

    const alterAuth = React.useCallback(function(state, user){
        setAuth({state : state, user : user})
    }, [])

    const AuthContextValue = React.useMemo(function(){
        return {...Auth, alterAuth};
    }, [Auth, alterAuth])
    
    if(loading){
        return <>
            <LoadingPage />
        </>
    }
    return <>
        <AuthContext.Provider value = {AuthContextValue}>
            <NavBar location = {location}/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path = '/settings' element = {<Settings />} />
                <Route path='/auth/logout' element={<Logout />} />
                <Route path='/auth/login' element={<Login />} />
                <Route path = '/auth/signup' element = {<Signup />} />
            </Routes>
        </AuthContext.Provider>
    </>
}