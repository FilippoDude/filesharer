import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CONFIG } from "../../../../config";
import { login } from "../../../../common/api";


export const LoginPopup = ({setShowLoginPopUp} : {setShowLoginPopUp: Dispatch<SetStateAction<boolean>>}) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    return(
        <div className="fixed z-10 w-screen h-screen flex items-center justify-center">
            <div className="relative w-80 h-60 bg-orange-600 rounded-md p-2 flex flex-col">
                <button className="text-white absolute top-0 right-2" onClick={() => setShowLoginPopUp(false)}>X</button>
                <h1 className="text-white font-bold text-lg">LOGIN</h1>
                <p className="text-white font-bold">USERNAME</p>
                <input onChange={(e)=>{setUsername(e.target.value)}} className=" font-bold"></input>
                <p className="text-white font-bold">PASSWORD</p>
                <input onChange={(e)=>{setPassword(e.target.value)}} className="font-bold"></input>
                <button onClick={() => login(username,password,setShowLoginPopUp,setErrorMessage)} className="mt-2 text-white font-bold rounded-md p-2 bg-orange-400 w-fit">Login</button>
                {errorMessage && 
                    <p className="text-red-950">{errorMessage}</p>
                }
            </div>
        </div>
    );
}

export default LoginPopup;