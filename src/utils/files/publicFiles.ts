
import fs from "fs";
import path from "path";
import { FILES_PATH } from "../../enviroment";
import { FilesError } from "../../errors/files.errors";
import { RawFileData } from "../../plugins/types/file.types";

export class publicFiles{

    static createFolder(): string{
        if(!fs.existsSync(FILES_PATH + "PUBLIC")){
            try{
                fs.mkdirSync(FILES_PATH + "PUBLIC");
            } catch(e){
                throw new FilesError(e);
            };
        }
        return FILES_PATH + "PUBLIC"
    }   

    static getFiles(): RawFileData[]{
        this.createFolder();
        try{
            const files: RawFileData[] = [];
            const filesPath = path.join(FILES_PATH, "PUBLIC");
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

    static getPathOfFile(fileId: string): string | null{
        this.createFolder();
        const filePath = path.join(FILES_PATH, "PUBLIC")
        if (fs.existsSync(filePath)) {
            return filePath
        }
        return null
    }

    static remove(fileId: string): void{
        this.createFolder();
        try{
            const filesPath = path.join(FILES_PATH, "PUBLIC");
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