import { useEffect, useState } from "react";
import axios from "axios";

import Search from "./components/search/search";
import Files from "./components/files/files";
import LoginPopup from "./components/loginPopup/loginPopup";

import { FileData } from "../../common/interfaces";

export const MainPage = () => {    
    const [updater, setUpdater] = useState<number>(0);

    // Login
    const [showLoginPopUp, setShowLoginPopUp] = useState<boolean>(false);

    // Other
    const [files, setFiles] = useState<FileData[]>([]);


    return(
        <>
            {/*<FilesCatcher className="w-screen h-screen bg-green-600 fixed z-10"/>*/}
            {showLoginPopUp && <LoginPopup setShowLoginPopUp={setShowLoginPopUp}/> }
            <div className="w-full min-h-screen bg-gray-100">
                <Search setUpdater={setUpdater} setShowLoginPopUp={setShowLoginPopUp} setFiles={setFiles} className=" relative w-full flex flex-col items-center"/>
                <Files files={files} setShowLoginPopUp={setShowLoginPopUp} className=" relative w-full flex flex-col items-center"/>
            </div>
        </>
    );

}

export default MainPage