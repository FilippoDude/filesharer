
import userFileModel from "../../database/user-file.model";
import userModel from "../../database/user.model";
import { userFiles } from "../../utils/files/userFiles";
import { FileData } from "../types/file.types";

export class userFileManagementService {
    static getFilesFromUser(userIdentifier: string): FileData[]{
        const user = userModel.get(userIdentifier);
        if(user){
            const refinedFilesData: FileData[] = []
            const rawFilesData = userFiles.getFiles(userIdentifier);
            rawFilesData.forEach(file => {
                const databaseFile = userFileModel.get(file.name);
                if(databaseFile){
                    refinedFilesData.push({
                            fileId: databaseFile.id,
                            name: databaseFile.fileName,
                            extension: file.extension,
                            size: file.size,
                            createdAt: file.createdAt,
                            modifiedAt: file.modifiedAt
                        }
                    )
                }
            });
            return refinedFilesData
        }   
        return [];
    }
    static removeFile(fileId: string): boolean{
        const file = userFileModel.get(fileId)
        if(file){
            userFileModel.remove(fileId)
            userFiles.remove(file.userId, fileId)
        }
        return false;
    }
}
