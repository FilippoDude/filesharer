// imports
import { useEffect, useLayoutEffect, useRef, useState } from "react"

export const RythmBar = () => {
    
    const dotElement = useRef<HTMLDivElement | null>(null);
    const movingElement = useRef<HTMLDivElement | null>(null);

    function resetPositions(){
        // resets the positions to the center
        if (gameAreaSize.width != null && gameAreaSize.height != null) {
            if(dotElement.current != null && movingElement.current != null){

                dotElement.current.style.top = ((gameAreaSize.height - dotElement.current.clientHeight) / 2).toString() + "px";
                dotElement.current.style.left = ((gameAreaSize.width - dotElement.current.clientWidth) / 2).toString() + "px";

                movingElement.current.style.top = (0).toString() + "px";
                movingElement.current.style.left = ((gameAreaSize.width - movingElement.current.clientWidth) / 2).toString() + "px";
            }
        }
    }

    return (
        <>
            {/* Div that functions as a click detector */}
            <div onClick={screenClick} className="w-screen h-screen fixed top-0 left-0 z-10"/>
        </>
    )

}