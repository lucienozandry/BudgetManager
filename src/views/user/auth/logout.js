import { AuthContext } from "../../../App"
import { useAuthRedirect } from "../../../config/functions/authentication";
import * as Session from "../../../config/functions/session";
import React from "react";

export default function Logout() {
    const {state} = React.useContext(AuthContext);
    useAuthRedirect(state, true);
    
    if(state){
        return <>
            <div className="container-md" style={{marginTop: "80px"}}>
                <LogoutElement />
            </div>
        </>
    }
}

function LogoutElement() {
    const Auth = React.useContext(AuthContext);

    function handleLogout(){
        Auth.alterAuth(false, {});
        Session.clear();
    }

    return <>
        <div className="row">
            <div className="col-8" style={{ margin: "0px auto" }}>
                <div className="card">
                    <div className="card-header">
                        <p className="display-5"> Vous allez être déconnecté</p>
                    </div>
                    <div className="card-body">
                        <button type="button" className="btn btn-danger" onClick={handleLogout}>Se déconnecter</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}