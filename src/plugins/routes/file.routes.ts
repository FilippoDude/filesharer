import express, { Request, Response } from "express";

import { validateToken } from "../middleware/user-auth.middleware";
import { upload } from "../services/file.service";
import { app } from "../webserver";

app.post("/upload", validateToken, upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }
    res.json({"file": "..."});
});