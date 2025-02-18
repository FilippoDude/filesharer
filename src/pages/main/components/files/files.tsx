import { useState } from "react";
import { FileInterface } from "../../../../common/interfaces";


export const Files = ({className, files} : {className: string, files: FileInterface[]}) => {   
    const [isEnabled, setIsEnabled] = useState<boolean>(true);

    

    return(
        <>
            <div className={className}>
                <input type="file"></input>
            </div>
        </>
    );

}

export default Files