
import express, { Request, Response } from "express";
import path from "path";

import { app } from "../webserver";
import userModel from "../../database/user.model";
import { FILES_PATH } from "../../enviroment";
import { validateToken } from "../middleware/user-auth.middleware";
import { upload } from "../services/file.service";
import { userFileManagementService } from "../services/user-file-management.service";
import userFileModel from "../../database/user-file.model";

app.post("/getfiles", validateToken, async (req: Request, res: Response) => {
    const userIdentifier = req.headers["user_identifier"] as string;
    return res.json({"files": userFileManagementService.getFilesFromUser(userIdentifier)})
});

// Possibily add a sharing functionality
app.get("/download/:userId/:fileId", validateToken, async (req: Request, res: Response) => {
    const fileId = req.params.fileId;
    const userIdentifier = req.params.userId;
    const userIdentifierHeader = req.headers["user_identifier"] as string;

    const user = userModel.get(userIdentifier);
    const userHeader = userModel.get(userIdentifierHeader);
    const file = userFileModel.get(fileId);
    
    if(user && file && userHeader && user.id == file.userId && user.id == userHeader.id){
        const filePath = path.join(path.join(FILES_PATH, userIdentifier), fileId);
        res.download(filePath, file.fileName, (err) => {
            if (err) {
                return res.status(500).json({ error: "Error downloading file" });
            }
        });
    } else {
        return res.status(404).json({ error: "File not found or unauthorized!" });
    }
});

app.use('/remove/:userId/:fileId', validateToken, async (req: Request, res: Response) => {
    const fileId = req.params.fileId;
    const userIdentifier = req.params.userId;
    const userIdentifierHeader = req.headers["user_identifier"] as string;
    const toPublicHeader = req.headers["public"] as string;
    const toPublic = toPublicHeader === "true" ? true : false;

    const user = userModel.get(userIdentifier);
    const userHeader = userModel.get(userIdentifierHeader);
    const file = userFileModel.get(fileId);

    if(user && file && userHeader && user.id == file.userId && user.id == userHeader.id){
        userFileManagementService.removeFile(fileId)
        return res.status(200).json({"success": true});
    } else {
        return res.status(404).json({ error: "File not found or unauthorized!" });
    }

})