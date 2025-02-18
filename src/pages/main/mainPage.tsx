import { useEffect, useState } from "react";

import Search from "./components/search/search";
import Files from "./components/files/files";

import { FileInterface } from "../../common/interfaces";
import FilesCatcher from "./components/filesCatcher/filesCatcher";

export const MainPage = () => {    
    const [updater, setUpdater] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [files, setFiles] = useState<FileInterface[]>([]);

    useEffect(() => {
        setFiles([]);
    }, [updater])

    return(
        <>
            <FilesCatcher className="w-screen h-screen bg-green-600 fixed z-10"/>
            <div className="w-full min-h-screen bg-gray-100">
                <Search setUpdater={setUpdater} className=" relative w-full flex flex-col items-center"/>
                <Files files={files} className=" relative w-full flex flex-col items-center"/>
            </div>
        </>
    );

}

export default MainPage