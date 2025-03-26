import { useEffect, useState } from "react";
import axios from "axios";

import Search from "./components/search/search";
import Files from "./components/files/files";
import LoginPopup from "./components/loginPopup/loginPopup";

import { FileData } from "../../common/interfaces";
import { getPublicFiles } from "../../common/api";

export const MainPage = () => {    
    const [updater, setUpdater] = useState<number>(0);

    // Login
    const [showLoginPopUp, setShowLoginPopUp] = useState<boolean>(false);

    // Other
    const [files, setFiles] = useState<FileData[]>([]);

    useEffect(() => {
        getPublicFiles(setFiles);
    }, [])

    return(
        <>
            {/*<FilesCatcher className="w-screen h-screen bg-green-600 fixed z-10"/>*/}
            {showLoginPopUp && <LoginPopup setShowLoginPopUp={setShowLoginPopUp}/> }
            <div className="relative w-full min-h-screen h-screen overflow-y-hidden bg-gray-400">
                <Search setUpdater={setUpdater} setShowLoginPopUp={setShowLoginPopUp} setFiles={setFiles} className=" relative w-full flex flex-col items-center"/>
                <Files files={files} setShowLoginPopUp={setShowLoginPopUp} setFiles={setFiles} className="relative w-full h-full flex flex-col items-center mt-1"/>
            </div>
        </>
    );

}

export default MainPage