import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CONFIG } from "../../../../config";


export const LoginPopup = ({hasToken, setHasToken, setShowLoginPopUp} : {hasToken: boolean, setHasToken: React.Dispatch<SetStateAction<boolean>>, setShowLoginPopUp: Dispatch<SetStateAction<boolean>>}) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(()=>{
        
    }, [])

    const validate = async () => {    
        try {
            const response = await axios.post(CONFIG.apiURL + "/login", {
                user_identifier: username,
                user_password: password,
            });
            console.log("Response:", response.data);
            if(!response.data["token"]){throw new Error("Token not received!")};
            sessionStorage.setItem("token", response.data["token"])
            sessionStorage.setItem("user_identifier", username)
            setShowLoginPopUp(false);
            setHasToken(true);
        } catch (error) {
            if(axios.isAxiosError(error)){
                setErrorMessage(error.response?.data?.error || "Failed to make validation!");
            } else {
                setErrorMessage("Error during validation!")
            }
        }

    }

    return(
        <div className="fixed z-10 w-screen h-screen flex items-center justify-center">
            <div className="relative w-80 h-60 bg-orange-600 rounded-md p-2 flex flex-col">
                <h1 className="text-white font-bold text-lg">LOGIN</h1>
                <p className="text-white font-bold">USERNAME</p>
                <input onChange={(e)=>{setUsername(e.target.value)}} className=" font-bold"></input>
                <p className="text-white font-bold">PASSWORD</p>
                <input onChange={(e)=>{setPassword(e.target.value)}} className="font-bold"></input>
                <button onClick={validate} className="mt-2 text-white font-bold rounded-md p-2 bg-orange-400 w-fit">Login</button>
                {errorMessage && 
                    <p className="text-red-950">{errorMessage}</p>
                }
            </div>
        </div>
    );
}

export default LoginPopup;