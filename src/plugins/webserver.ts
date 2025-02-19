import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "./enviroment";
import userModel from "./database/user";
import { userFiles } from "./files/user";
import { UserToken } from "./interfaces";

const app = express();     
app.use(cors()); //app.use(cors({origin: '*',methods: ['GET', 'POST'],}));
app.use(express.json());


/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.headers["user_id"];
        const token = req.headers["user_token"];

        cb(null, "userFolder"); 
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${timestamp}${ext}`); // Determines file name
    }
});
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
    
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({ message: "File uploaded successfully!", filename: req.file.filename });
});*/


app.post("/login", async (req: Request, res: Response) => {
    const userIdentifier = req.body["user_identifier"];
    const userPassword = req.body["user_password"];

    if(!userIdentifier){
        return res.status(400).json({"error": "User Identifier not set!"})
    }
    if(!userPassword){
        return res.status(400).json({"error": "Password not set!"})
    }
    
    const user = userModel.getUser(userIdentifier);
    if(user){
        if(await bcrypt.compare(userPassword, user.passwordHash)){
            if(JWT_SECRET){
                const token = jwt.sign({userId: userIdentifier} as UserToken, JWT_SECRET, {expiresIn: "1h"});
                return res.json({"token": token})
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

const validate = (userIdentifier: string, token: string): boolean => {
    try{
        const decoded : UserToken = jwt.verify(token, JWT_SECRET) as UserToken
        if(!decoded.userId){
            return false;
        } 
        return decoded.userId === userIdentifier;
    } catch(e){
        return false;
    }
}

app.post("/validate", async (req: Request, res: Response) => {
    const userIdentifier = req.headers["user_identifier"] as string;
    const token = req.headers["token"] as string;

    if(!userIdentifier){
        return res.status(400).json({"error": "User identifier is not set!"});
    }

    if(!token){
        return res.status(400).json({"error": "Token is not set!"});
    }


    if(validate(userIdentifier, token)){
        return res.status(200).json({"success": true});
    } else {
        return res.status(403).json({"error": "Token is not valid!"});
    }


});

app.post("/getFiles", async (req: Request, res: Response) => {
    const userIdentifier = req.headers["user_indentifier"] as string;
    const token = req.headers["token"] as string;

    if(!userIdentifier){
        return res.status(400).json({"error": "User identifier is not set!"});
    }

    if(!token){
        return res.status(400).json({"error": "Token is not set!"});
    }

    if(validate(userIdentifier, token)){
        return res.json({"files": userFiles.getFiles(userIdentifier)})
    } else {
        return res.status(403).json({"error": "Token is not valid!"});
    }
    

});

app.get('/', (req, res) => {
    res.send('^_^');
});

app.listen(3000, async () => {
    console.log(await userModel.createUser("filippodude", "investBig!"));
});


