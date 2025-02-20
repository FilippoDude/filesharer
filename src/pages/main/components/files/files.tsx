import { Dispatch, SetStateAction, useState } from "react";
import { FileData } from "../../../../common/interfaces";
import { downloadFile, uploadFile } from "../../../../common/api";


export const Files = ({className, files, setShowLoginPopUp} : {className: string, files: FileData[], setShowLoginPopUp: Dispatch<SetStateAction<boolean>>}) => {   
    const [isEnabled, setIsEnabled] = useState<boolean>(true);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            if(file)uploadFile(setShowLoginPopUp, file)
        }
    };
    
    return(
        <>
            <div className={className}>
                <input type="file" onChange={handleFileChange}></input>
                <button onClick={() => downloadFile(setShowLoginPopUp, "a4e47536-4a86-4959-95ea-dbfc5d12a84a")}>Try Download!</button>
            </div>
        </>
    );

}

export default Files