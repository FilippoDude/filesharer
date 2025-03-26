import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CONFIG } from "../../../../../config";
import { checkToken, getPublicFiles, getUserFiles } from "../../../../../common/api";
import { FileData } from "../../../../../common/interfaces";


export const TagsPopup = ({className, isEnabled, setUpdater, setShowLoginPopUp, setFiles} : {className: string, isEnabled: boolean, setUpdater: Dispatch<SetStateAction<number>>, setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, setFiles: Dispatch<SetStateAction<FileData[]>>}) => {    

    const changeSpaceToUser = async () => {
        if(await getUserFiles(setShowLoginPopUp, setFiles)){
            CONFIG.tags.space = "USER"; 
            setUpdater(prev => ++prev);
        }
    }

    const changeSpaceToPublic = async () => {
        if(await getPublicFiles(setFiles)){
            CONFIG.tags.space = "PUBLIC"; 
            setUpdater(prev => ++prev);
        }
    }

    return(
        <>  
            <div className={`${className} overflow-hidden transition-all duration-500 ${isEnabled ? "max-h-48 mt-1" : "max-h-0 mt-0"}`}>
                <div className="w-full min-h-40 p-2">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold">SPACE:</h1>
                        <div className="flex flex-row gap-2">
                            <button className={`${CONFIG.tags.space == "PUBLIC" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={changeSpaceToPublic}>PUBLIC</button>
                            <button className={`${CONFIG.tags.space == "USER" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={changeSpaceToUser}>{sessionStorage.getItem("user_name") ? sessionStorage.getItem("user_name") : "USER"}</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold">LAYOUT:</h1>
                        <div className="flex flex-row gap-2">
                            <button className={`${CONFIG.tags.layout == "STANDARD" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={() => {CONFIG.tags.layout = "STANDARD"; setUpdater(prev => ++prev)}}>STANDARD</button>
                            <button className={`${CONFIG.tags.layout == "BOXED" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={() => {CONFIG.tags.layout = "BOXED"; setUpdater(prev => ++prev)}}>BOXED</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold">ADDITIONAL:</h1>
                        <div className="flex flex-row gap-2">
                            <button className={`bg-red-500 p-1 text-white rounded-md select-none`} onClick={() => setShowLoginPopUp(true)}>RELOG</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default TagsPopup