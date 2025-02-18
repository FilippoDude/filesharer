// imports
import { useEffect, useLayoutEffect, useRef, useState, createContext, useContext, } from "react"

const GameContext = createContext();

// In here we define the MainPage component (i.e the main component of our website)
// The function can be defined also as "export function MainPage(){}" but its preferred to write it as a const variable
export const MainPage = () => {
    const [firstLoad, setFirstLoad] = useState<boolean>(false);
    const gameInterval = useRef<number | null>(null)
    const gameAreaElement = useRef<HTMLDivElement | null>(null);
    const [gameAreaSize, setGameAreaSize] = useState<{width : number | null, height: number | null}>({
        width: null,
        height: null
    });
  

    function startGame(){
        gameInterval.current != null ? clearInterval(gameInterval.current) : null
        gameInterval.current = setInterval(() => {
        })
    }


    const handleResize = () => {
        if(gameAreaElement.current != null){
            setGameAreaSize({
                width: gameAreaElement.current.clientWidth,
                height: gameAreaElement.current.clientHeight
            })

        }
    }


    // The useEffect function is called when the component is mounted (kinda like a constructor) or by state changes
    // At the end we put the [] to define the dependencies (states) that it "listens" to, if we put empty it gets only called when the component mounts
    useEffect(() => {
        // With this code we listed to when the screen resizes and we call the function on the const handleResize
        window.addEventListener('resize', handleResize);
        handleResize()
        // We could just put the startGame() here in place of this but it may cause problems since components may have not been loaded yet
        // So we just cause a re-render (since states cause re-renders) and the components should be loaded already
        setFirstLoad(true)
        // This code gets executed when the component unmounts
        return () => {
            // Clean up event listener on component unmount
            window.removeEventListener('resize',handleResize);
            // Clear the inteval (stop the ticks)
            gameInterval.current != null ? clearInterval(gameInterval.current) : null
        };
    }, [])


    // this is needed since we want to make sure the components are first of all loaded
    useEffect(() => {
        startGame()
    }, [firstLoad]);

    // Function that is called when the screen is clicked
    function screenClick(){
        console.log("Click Detected")
        if(gameAreaSize.height != null && gameAreaSize.width != null){

        }

    }


    return (
        <>
            {/* Div that functions as a click detector */}
            <div onClick={screenClick} className="w-screen h-screen fixed top-0 left-0 z-10"/>
            <div className="fixed p-2 top-0 left-0 ">
                <p className="text-white">{level == 3 ? "End" : "Level " + level}</p>
            </div>
            {/* If the level is 3 show this div*/}
            {/* Game Area */}
            <div ref={gameAreaElement} className="w-screen h-screen absolute top-0 left-0">
                <div ref={dotElement} className="absolute w-10 h-10 bg-slate-500"/>
                <div ref={movingElement} className="absolute bg-white"/>
            </div>
        </>
    )

}


// Hook to use the context
export default MainPage