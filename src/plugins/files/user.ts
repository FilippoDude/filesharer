import fs from "fs";
import path from "path";
import userModel from "../database/user";
import { FILES_PATH } from "../enviroment";
import { FileData } from "../interfaces";

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
                const userFilesPath = path.join(FILES_PATH, user.id.toString());
                console.log(userFilesPath)
                const files: FileData[] = [];
                const items = fs.readdirSync(userFilesPath, { withFileTypes: true });
                for (const item of items) {
                    if (!item.isFile()) continue; 
                    const absolutePath = path.join(userFilesPath, item.name);
                    const stats = fs.statSync(absolutePath);
                    files.push({
                        name: path.basename(item.name, path.extname(item.name)),
                        extension: path.extname(item.name), 
                        size: stats.size, 
                        createdAt: stats.birthtime, 
                        modifiedAt: stats.mtime, 
                    });
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
                const userFilesPath = path.join(FILES_PATH, user.id.toString());
                const files: FileData[] = [];
                const items = fs.readdirSync(userFilesPath, { withFileTypes: true });
                for (const item of items) {
                    if (!item.isFile()) continue; 
                    const absolutePath = path.join(userFilesPath, item.name);
                    const stats = fs.statSync(absolutePath);
                    files.push({
                        name: path.basename(item.name, path.extname(item.name)),
                        extension: path.extname(item.name), 
                        size: stats.size, 
                        createdAt: stats.birthtime, 
                        modifiedAt: stats.mtime, 
                    });
                }
                return files;
            }catch(e){
                console.log("Failed to fetch the files of a user from a folder!")
                console.log(e)
            }
        } 
        return [];
    }

    

}