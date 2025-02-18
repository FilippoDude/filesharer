import { useState } from "react";
import { FileInterface } from "../../../../common/interfaces";
import axios from "axios"
import { CONFIG } from "../../../../CONFIG";

export const FilesCatcher = ({className} : {className: string}) => {   
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);

    // Upload file
    const uploadFile = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(CONFIG.apiURL + "/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("File uploaded:", response.data);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

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