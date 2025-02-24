import fs from "fs";
import path from "path";
import userModel from "../database/user";
import { FILES_PATH } from "../enviroment";
import { FileData } from "../interfaces";
import fileModel from "../database/file";

export class userFiles{

    static create(userIdentifier: string): void{
        const user = userModel.getUser(userIdentifier);
        if(user){
            if(!fs.existsSync(FILES_PATH + user.id)){
                try{
                    fs.mkdirSync(FILES_PATH + user.id);
                } catch(e){
                    console.log("Failed to create a user's file folder!")
                };
            }
        } 
    }   

    static getFiles(userIdentifier: string): FileData[]{
        const user = userModel.getUser(userIdentifier);
        if(user){
            this.create(userIdentifier);
            try{
                const userFilesPath = path.join(FILES_PATH, user.id);
                const files: FileData[] = [];
                const items = fs.readdirSync(userFilesPath, { withFileTypes: true });
                for (const item of items) {
                    if (!item.isFile()) continue; 
                    const absolutePath = path.join(userFilesPath, item.name);
                    const stats = fs.statSync(absolutePath);
                    const fileId = fileModel.getFile(item.name);
                    if(fileId){
                        files.push({
                            fileId: fileId.id,
                            name: path.basename(item.name, path.extname(item.name)),
                            extension: path.extname(item.name), 
                            size: stats.size, 
                            createdAt: stats.birthtime, 
                            modifiedAt: stats.mtime, 
                        });
                    }
                }
                return files;
            }catch(e){
                console.log("Failed to fetch the files of a user from a folder!")
                console.log(e)
            }
        } 
        return [];
    }

    static getFileFromParams(userIdentifier: string): FileData[]{
        const user = userModel.getUser(userIdentifier);
        if(user){
            this.create(userIdentifier);
            try{
                const userFilesPath = path.join(FILES_PATH, user.id);
                const files: FileData[] = [];
                const items = fs.readdirSync(userFilesPath, { withFileTypes: true });
                for (const item of items) {
                    if (!item.isFile()) continue; 
                    const absolutePath = path.join(userFilesPath, item.name);
                    const stats = fs.statSync(absolutePath);
                    const fileId = fileModel.getFile(item.name);
                    if(fileId){
                        files.push({
                            fileId: fileId.id,
                            name: path.basename(item.name, path.extname(item.name)),
                            extension: path.extname(item.name), 
                            size: stats.size, 
                            createdAt: stats.birthtime, 
                            modifiedAt: stats.mtime, 
                        });
                    }
                }
                return files;
            }catch(e){
                console.log("Failed to fetch the files of a user from a folder!")
                console.log(e)
            }
        } 
        return [];
    }

    static removeFile(userIdentifier: string, fileId: string): void{
        const user = userModel.getUser(userIdentifier);
        if(user){
            this.create(userIdentifier);
            try{
                const userFilesPath = path.join(FILES_PATH, user.id);
                const items = fs.readdirSync(userFilesPath, { withFileTypes: true });
                for (const item of items) {
                    if (!item.isFile()) continue; 
                    const absolutePath = path.join(userFilesPath, item.name);
                    if(item.name == fileId){
                        fs.rmSync(absolutePath);
                    }

                }
            }catch(e){
                console.log("Failed to remove a file from a user's folder!")
                console.log(e)
            }
        }

    }

    

}