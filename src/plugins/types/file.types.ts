export interface FileDataDatabase{
    id: string;
    userId: string;
    fileName: string;
}
export interface RawFileData{
    name: string;
    extension: string;
    size: number; 
    createdAt: Date;
    modifiedAt: Date;
}
export interface FileData{
    fileId: string;
    name: string;
    extension: string;
    size: number; 
    createdAt: Date;
    modifiedAt: Date;
}