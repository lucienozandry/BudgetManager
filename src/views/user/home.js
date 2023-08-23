import React from "react";
import { useAuthRedirect } from "../../config/functions/authentication";
import { AuthContext } from "../../App";

export default function Home(){
    const {state} = React.useContext(AuthContext);

    useAuthRedirect(state);

    return <>
        <div className="container-md" style={{marginTop: "80px"}}>
            Home
        </div>
    </>
}