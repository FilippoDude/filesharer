import { useEffect, useState } from "react";
import axios from "axios";

import Search from "./components/search/search";
import Files from "./components/files/files";
import LoginPopup from "./components/loginPopup/loginPopup";

import { FileInterface } from "../../common/interfaces";
import FilesCatcher from "./components/filesCatcher/filesCatcher";
import { CONFIG } from "../../config";

export const MainPage = () => {    
    const [updater, setUpdater] = useState<number>(0);

    // Login
    const [showLoginPopUp, setShowLoginPopUp] = useState<boolean>(false);
    const [hasToken, setHasToken] = useState<boolean>(false)

    // Other
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [files, setFiles] = useState<FileInterface[]>([]);

    const validateToken = async (userId: string, token: string) => {    
        try {
            const response = await axios.post(CONFIG.apiURL + "/validate", {}, {
                headers: {
                    'user_identifier': userId,
                    'token': token,
                },
            });            

            setHasToken(true);
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error.response?.data?.error || "Token invalid!")
            } else {
                console.log("Error during token validation!")
            }
        }
    }

    useEffect(() => {
        
        if(!hasToken){
            const userId = sessionStorage.getItem("user_identifier");
            const token = sessionStorage.getItem("token");
            if(token && userId){
                validateToken(userId, token);
            } 
        }
    }, [updater])

    return(
        <>
            {/*<FilesCatcher className="w-screen h-screen bg-green-600 fixed z-10"/>*/}
            {showLoginPopUp && <LoginPopup hasToken={hasToken} setHasToken={setHasToken} setShowLoginPopUp={setShowLoginPopUp}/> }
            <div className="w-full min-h-screen bg-gray-100">
                <Search setUpdater={setUpdater} setShowLoginPopUp={setShowLoginPopUp} hasToken={hasToken} className=" relative w-full flex flex-col items-center"/>
                <Files files={files} className=" relative w-full flex flex-col items-center"/>
            </div>
        </>
    );

}

export default MainPage