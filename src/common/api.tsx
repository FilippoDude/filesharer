import axios from "axios";
import { Dispatch, SetStateAction } from "react";

import { CONFIG } from "../config";
import { FileData } from "./interfaces";

export const login = async (username: string, password: string, setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, setErrorMessage: Dispatch<SetStateAction<string>>) => {    
    try {
        const response = await axios.post(CONFIG.apiURL + "/login", {
            user_name: username,
            user_password: password,
        });
        console.log("Response:", response.data);
        if(!response.data["user_identifier"]){throw new Error("User identifier not received!")};
        if(!response.data["token"]){throw new Error("Token not received!")};
        sessionStorage.setItem("token", response.data["token"])
        sessionStorage.setItem("user_identifier", response.data["user_identifier"])
        setShowLoginPopUp(false);
    } catch (error) {
        if(axios.isAxiosError(error)){
            setErrorMessage(error.response?.data?.error || "Failed to login!");
        } else {
            setErrorMessage("Error during login!")
        }
    }
}

export const checkToken = async (setShowLoginPopUp: Dispatch<SetStateAction<boolean>>) : Promise<boolean> => {    
    const userId = sessionStorage.getItem("user_identifier");
    const token = sessionStorage.getItem("token");
    if(token && userId){
        try {
            await axios.post(CONFIG.apiURL + "/validate", {}, {
                headers: {
                    'user_identifier': userId,
                    'token': token,
                },
            });            
            return true;
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error.response?.data?.error || "Failed to validate token!")
            } else {
                console.log("Error during token validation!")
            }
        }
    }
    setShowLoginPopUp(true);
    return false;
}

export const getUserFiles = async (setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, setFiles: Dispatch<SetStateAction<FileData[]>>) : Promise<boolean> => {   
    const userId = sessionStorage.getItem("user_identifier");
    const token = sessionStorage.getItem("token");
    
    if(await checkToken(setShowLoginPopUp)){
        if(token && userId){
            try {
                const response = await axios.post(CONFIG.apiURL + "/getFiles", {}, {
                    headers: {
                        'user_identifier': userId,
                        'token': token,
                    },
                });            
                
                console.log(response.data)
                // setFiles(response.data["files"])
                return true;
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data?.error || "Failed to get files!")
                } else {
                    console.log("Error while trying to get the user files!")
                }
            }
        }
    }
    setFiles([]);
    
    return false;
}

export const uploadFile = async (setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, file: File) => {
    if (!file) return;
    const userId = sessionStorage.getItem("user_identifier");
    const token = sessionStorage.getItem("token");
    
    if(token && userId){
        if(await checkToken(setShowLoginPopUp)){
            const formData = new FormData();    
            formData.append("file", file);

            try {
                const response = await axios.post(CONFIG.apiURL + "/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        timeout: 10000,
                        'user_identifier': userId,
                        'token': token,
                    },
                });

                console.log("File uploaded:", response.data);
            } catch (error) {
                console.error("Upload failed", error);
            }
        }
    }
};

export const downloadFile = async (setShowLoginPopUp: Dispatch<SetStateAction<boolean>>, fileId: string) => {
    const userId = sessionStorage.getItem("user_identifier");
    const token = sessionStorage.getItem("token");
    
    if(token && userId){
        if(await checkToken(setShowLoginPopUp)){
            try {
                const response = await fetch(CONFIG.apiURL + `/download/${userId}/${fileId}`, {
                    method: "GET",
                    headers: {
                        'user_identifier': userId,
                        'token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to download file");
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = fileId; 
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Download failed:", error);
            }
        }
    }
};