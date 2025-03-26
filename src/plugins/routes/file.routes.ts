import express, { Request, Response } from "express";

import { validateToken } from "../middleware/user-auth.middleware";
import { upload } from "../services/file.service";
import { app } from "../webserver";
import publicFileModel from "../../database/public-file.model";
import userFileModel from "../../database/user-file.model";
import { publicFiles } from "../../utils/files/publicFiles";
import { userFiles } from "../../utils/files/userFiles";
import fs from "fs"

app.post("/upload", validateToken, upload.single("file"), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        console.log("ANYTHING")
        const userIdentifier = req.headers["user_identifier"] as string;
        const toPublic = req.headers["public"] === "true";

        let fileName: string;
        if (toPublic) {
            fileName = await publicFileModel.create(req.file.originalname);
        } else {
            fileName = await userFileModel.create(userIdentifier, req.file.originalname);
        }

        // Define file path
        const destinationPath = toPublic ? publicFiles.createFolder() : userFiles.createFolder(userIdentifier);
        console.log(destinationPath)
        const filePath = `${destinationPath}/${fileName}`;

        // Write file to disk
        fs.writeFileSync(filePath, req.file.buffer);

        res.json({ success: true, fileName });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});