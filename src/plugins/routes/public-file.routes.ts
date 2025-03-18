
import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

import { app } from "../webserver";
import userModel from "../../database/user.model";
import { FILES_PATH } from "../../enviroment";
import { validateToken } from "../middleware/user-auth.middleware";
import publicFileModel from "../../database/public-file.model";
import { publicFileManagementService } from "../services/public-file-management.service copy";

app.post("/getpublicfiles", async (req: Request, res: Response) => {
    return res.json({"files": publicFileManagementService.getFiles()})
});

app.get("/download/public/:fileId", validateToken, async (req: Request, res: Response) => {
    const fileId = req.params.fileId;
    const userIdentifierHeader = req.headers["user_identifier"] as string;
    const file = publicFileModel.get(fileId);
    
    if(file){
        const filePath = path.join(path.join(FILES_PATH, "PUBLIC"), fileId);
        console.log(file.fileName)
        res.setHeader("Content-Disposition", `attachment; filename="${file.fileName}"`);
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition"); // Allows frontend to access the header
        
        res.download(filePath, file.fileName, (err) => {
            if (err) {
                return res.status(500).json({ error: "Error downloading file" });
            }
        });
    } else {
        return res.status(404).json({ error: "File not found or unauthorized!" });
    }
});