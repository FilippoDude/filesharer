import userModel from "../../database/user.model";
import fs from "fs";
import path from "path";
import { FILES_PATH } from "../../enviroment";
import { FilesError } from "../../errors/files.errors";
import { RawFileData } from "../../plugins/types/file.types";

export class userFiles{

    static createFolder(userIdentifier: string): string{
        if(!fs.existsSync(FILES_PATH + userIdentifier)){
            try{
                fs.mkdirSync(FILES_PATH + userIdentifier);
            } catch(e){
                throw new FilesError(e);
            };
        }
        return FILES_PATH + userIdentifier
    }   

    static getFiles(userIdentifier: string): RawFileData[]{
        this.createFolder(userIdentifier);
        try{
            const files: RawFileData[] = [];
            const filesPath = path.join(FILES_PATH, userIdentifier);
            const items = fs.readdirSync(filesPath, { withFileTypes: true });
            for (const item of items) {
                if (!item.isFile()) continue; 
                const absolutePath = path.join(filesPath, item.name);
                const stats = fs.statSync(absolutePath);
                files.push({
                    name: item.name,
                    extension: path.extname(item.name), 
                    size: stats.size, 
                    createdAt: stats.birthtime, 
                    modifiedAt: stats.mtime, 
                });
            }
            return files;
        }catch(e){
            throw new FilesError(e);
        }

    }

    static remove(userIdentifier: string, fileId: string): void{
        this.createFolder(userIdentifier);
        try{
            const filesPath = path.join(FILES_PATH, userIdentifier);
            const items = fs.readdirSync(filesPath, { withFileTypes: true });
            for (const item of items) {
                if (!item.isFile()) continue; 
                const absolutePath = path.join(filesPath, item.name);
                if(item.name == fileId){
                    fs.rmSync(absolutePath);
                }
            }
        }catch(e){
            throw new FilesError(e);
        }
    }   
}