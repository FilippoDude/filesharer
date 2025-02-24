export interface User{
    id: string,
    userName: string,
    passwordHash: string
}
export interface FileDataDatabase{
    id: string;
    userId: string;
    fileName: string;
}

export interface FileData{
    fileId: string;
    name: string;
    extension: string;
    size: number; 
    createdAt: Date;
    modifiedAt: Date;
}


export interface UserToken{
    userId: string,
}
