import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { FILES_PATH, JWT_SECRET } from "./enviroment";
import userModel from "./database/user";
import { userFiles } from "./files/user";
import { FileDataDatabase, UserToken } from "./interfaces";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import fileModel from "./database/file";

const app = express();     
app.use(cors()); //app.use(cors({origin: '*',methods: ['GET', 'POST'],}));
app.use(express.json());

const validateToken = (req: Request, res: Response, next: Next) => {
    const userIdentifier = req.headers["user_identifier"] as string;
    const token = req.headers["token"] as string;

    if(!userIdentifier){
        return res.status(400).json({"error": "User identifier is not set!"});
    }

    if(!token){
        return res.status(400).json({"error": "Token is not set!"});
    }

    try{
        const decoded : UserToken = jwt.verify(token, JWT_SECRET) as UserToken
        console.log(decoded.userId)
        console.log(userIdentifier)
        if(!decoded.userId || decoded.userId !== userIdentifier){
            throw new Error("Token invalid!");
        } 
        next();
    } catch(e){
        return res.status(403).json({"error": "Token is not valid!"});
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userIdentifier = req.headers["user_identifier"] as string;
        const user = userModel.getUser(userIdentifier);
        try{
            if(user){
                userFiles.create(userIdentifier);
                const userFilesPath = path.join(FILES_PATH, user.id.toString());
                return cb(null, userFilesPath); 
            } else {
                return cb(new Error("Invalid user"), "");
            }
        } catch(e){
            return cb(new Error("Failed to create user directory"), "");
        }
    },
    filename: (req, file, cb) => {
        var fileName = uuidv4();
        while(fileModel.getFile(fileName)){fileName = uuidv4();};
        const userIdentifier = req.headers["user_identifier"] as string;
        fileModel.save(fileName, userIdentifier, file.originalname);
        return cb(null, fileName); 
    }
});

const upload = multer({ storage });
app.post("/upload", validateToken, upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }
    res.json({"file": "..."});
});


app.post("/login", async (req: Request, res: Response) => {
    const userName = req.body["user_name"];
    const userPassword = req.body["user_password"];

    if(!userName){
        return res.status(400).json({"error": "User Name not set!"})
    }
    if(!userPassword){
        return res.status(400).json({"error": "Password not set!"})
    }

    const user = userModel.getUserByUsername(userName);
    if(user){
        if(await bcrypt.compare(userPassword, user.passwordHash)){
            if(JWT_SECRET){
                const token = jwt.sign({userId: user.id} as UserToken, JWT_SECRET, {expiresIn: "1h"});
                return res.json({"token": token, "user_identifier": user.id})
            } else {
                return res.status(500).json({"error": ""});
            }
        } else {
            return res.status(403).json({"error": "Password does not match!"})
        };
    } else {
        return res.status(400).json({"error": "User not found!"})
    }
});


app.post("/validate", validateToken, async (req: Request, res: Response) => {
    return res.status(200).json({"success": true});
});

app.post("/getFiles", validateToken, async (req: Request, res: Response) => {
    const userIdentifier = req.headers["user_identifier"] as string;
    console.log(userFiles.getFiles(userIdentifier))
    return res.json({"files": userFiles.getFiles(userIdentifier)})
});

app.get("/download/:userId/:fileId", validateToken, async (req: Request, res: Response) => {
    const fileId = req.params.fileId;
    const userIdentifier = req.params.userId;
    const userIdentifierHeader = req.headers["user_identifier"] as string;

    const user = userModel.getUser(userIdentifier);
    const userHeader = userModel.getUser(userIdentifierHeader);
    const file = fileModel.getFile(fileId);
    
    if(user && file && userHeader && user.id == file.userId && user.id == userHeader.id){
        const filePath = path.join(path.join(FILES_PATH, userIdentifier), fileId);
        res.download(filePath, file.fileName, (err) => {
            if (err) {
                res.status(500).json({ error: "Error downloading file" });
            }
        });
    } else {
        return res.status(404).json({ error: "File not found or unauthorized!" });
    }
});


app.get('/', (req, res) => {
    res.send('^_^');
});

app.listen(3000, async () => {
    console.log(await userModel.createUser("filippodude", "investBig!"));
});


