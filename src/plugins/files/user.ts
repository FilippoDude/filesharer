import fs from "fs";
import userModel from "../database/user";
import { FILES_PATH } from "../enviroment";
import { File } from "../interfaces";

export class userFiles{

    static create(userIdentifier: string){
        if(userModel.getUser(userIdentifier)){
            if(!fs.existsSync(FILES_PATH + userIdentifier)){
                fs.mkdirSync(FILES_PATH + userIdentifier);
            }
        } 
    }   

    static getFiles(userIdentifier: string){
        if(userModel.getUser(userIdentifier)){
            const files: File[] = [];
            
        
        }
    }

    

}