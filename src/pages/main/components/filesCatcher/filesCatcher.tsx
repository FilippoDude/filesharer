import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios"
import { CONFIG } from "../../../../config";
import { uploadFile } from "../../../../common/api";

export const FilesCatcher = ({className, setShowLoginPopUp} : {className: string, setShowLoginPopUp: Dispatch<SetStateAction<boolean>>}) => {   
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);

    // Drop handling
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);

        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFile(droppedFiles[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            if(file)uploadFile(setShowLoginPopUp,file)
        }
    };

    

    return(
        <>
            <div className={`${className} cursor-pointer`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <input type="file" onChange={handleFileChange} className="mt-4" />
            </div>
        </>
    );

}

export default FilesCatcher