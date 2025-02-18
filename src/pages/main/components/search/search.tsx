import { Dispatch, SetStateAction, useState } from "react";
import TagsPopup from "./components/tagsPopup";
import TagsDisplay from "./components/tagsDisplay";

export const Search = ({className, setUpdater} : {className: string, setUpdater: Dispatch<SetStateAction<number>>}) => {   
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    return(
        <>
            <div className={className}>
                <div className="mt-3 w-8/12 h-10  rounded-md flex flex-row">
                    <button onClick={() => setIsEnabled(prev => !prev)} className="w-16 h-full bg-yellow-400 rounded-l-md "></button>
                    <input className="w-full bg-yellow-500 text-white pl-2"></input>
                </div>
                <TagsPopup className="relative w-8/12 bg-yellow-400 rounded-md" isEnabled={isEnabled} setUpdater={setUpdater}/>
                <TagsDisplay className="relative mt-1 w-8/12 h-10 bg-yellow-400 rounded-md flex items-center gap-1 p-1" />
            </div>
        </>
    );

}

export default Search