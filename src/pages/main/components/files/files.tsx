import { Dispatch, SetStateAction, useState } from "react";
import { FileData } from "../../../../common/interfaces";
import { downloadFile, getUserFiles, removeFile, uploadFile } from "../../../../common/api";


export const Files = ({className, files, setShowLoginPopUp, setFiles} : {className: string, files: FileData[], setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, setFiles: Dispatch<SetStateAction<FileData[]>>}) => {   
    const [isEnabled, setIsEnabled] = useState<boolean>(true);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    return(
        <>
            <div className={className}>
                <div className="relative w-8/12 h-10 bg-yellow-600 rounded-t-md flex items-center p-2">
                    <input type="file" onChange={handleFileChange}></input>
                    <button onClick={() => {if(file){uploadFile(setShowLoginPopUp, file); getUserFiles(setShowLoginPopUp, setFiles)}}} className="bg-orange-500 p-1 rounded-md text-white font-bold">Upload!</button>
                    <button className="right-2 absolute" onClick={() => downloadFile(setShowLoginPopUp, "a4e47536-4a86-4959-95ea-dbfc5d12a84a")}>Try Download!</button>
                </div>
                <div className="relative w-8/12 h-full bg-yellow-500 flex items-center p-2 flex-col gap-1">
                    {files.map(file => (
                        <div key={file.name} className="relative w-10/12 min-h-20 h-20 bg-orange-600 rounded-md p-2">
                            <h1 className="text-white font-bold">{file.name}</h1>
                            <p className=" text-white font-bold opacity-80">{file.size}b</p>
                            <h1 className="absolute top-2 right-2 text-white font-bold">12/01/2000</h1>
                            <button onClick={() => downloadFile(setShowLoginPopUp, file.fileId)} className="absolute right-20 bottom-2 bg-green-500 bg-opacity-50 p-1 rounded-md text-white font-bold">Download</button>
                            <button onClick={() => {removeFile(setShowLoginPopUp, file.fileId); getUserFiles(setShowLoginPopUp, setFiles)}} className="absolute right-2 bottom-2 bg-red-500 bg-opacity-50 p-1 rounded-md text-white font-bold">Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default Files