import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CONFIG } from "../../../../../config";


export const TagsPopup = ({className, isEnabled, setUpdater, setShowLoginPopUp, hasToken} : {className: string, isEnabled: boolean, setUpdater: Dispatch<SetStateAction<number>>, setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, hasToken: boolean}) => {    

    return(
        <>  
            <div className={`${className} overflow-hidden transition-all duration-500 ${isEnabled ? "max-h-40 mt-1" : "max-h-0 mt-0"}`}>
                <div className="w-full min-h-40 p-2">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold">SPACE:</h1>
                        <div className="flex flex-row gap-2">
                            <button className={`${CONFIG.tags.space == "PUBLIC" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={() => {CONFIG.tags.space = "PUBLIC"; setUpdater(prev => ++prev)}}>PUBLIC</button>
                            <button className={`${CONFIG.tags.space == "USER" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={() => {if(hasToken){CONFIG.tags.space = "USER"; setUpdater(prev => ++prev)}else{setShowLoginPopUp(true)}}}>USER</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold">LAYOUT:</h1>
                        <div className="flex flex-row gap-2">
                            <button className={`${CONFIG.tags.layout == "STANDARD" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={() => {CONFIG.tags.layout = "STANDARD"; setUpdater(prev => ++prev)}}>STANDARD</button>
                            <button className={`${CONFIG.tags.layout == "BOXED" ? "bg-orange-600" : "bg-orange-400"} p-1 text-white rounded-md select-none`} onClick={() => {CONFIG.tags.layout = "BOXED"; setUpdater(prev => ++prev)}}>BOXED</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default TagsPopup