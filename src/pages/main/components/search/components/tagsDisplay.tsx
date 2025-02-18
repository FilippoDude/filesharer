import { useEffect, useState } from "react";
import { CONFIG } from "../../../../../CONFIG";

export const TagsDisplay = ({className} : {className: string}) => {    
    const [updater, setUpdater] = useState<number>(0);
    
    return(
        <>  
            <div className={`${className}`}>    
                <button className={`bg-orange-600 p-1 text-white rounded-md select-none`} >{CONFIG.tags.space}</button>
                <button className={`bg-orange-600 p-1 text-white rounded-md select-none`} >{CONFIG.tags.layout}</button>
            </div>  
        </>
    );

}

export default TagsDisplay