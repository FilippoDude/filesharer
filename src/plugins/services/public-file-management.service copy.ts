
import publicFileModel from "../../database/public-file.model";
import { publicFiles } from "../../utils/files/publicFiles";
import { FileData } from "../types/file.types";
import fs from "fs";

export class publicFileManagementService {
    static getFiles(): FileData[]{
        const refinedFilesData: FileData[] = []
        const rawFilesData = publicFiles.getFiles();
        rawFilesData.forEach(file => {

            const databaseFile = publicFileModel.get(file.name);
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
    static getFile(fileId: string): string | null{
        const file = publicFileModel.get(fileId);
        if(file){
            return publicFiles.getPathOfFile(fileId)
        }
        return null
    }
}
