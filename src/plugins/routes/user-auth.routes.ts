import express, {Request, Response} from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { app } from "../webserver"
import { validateToken } from "../middleware/user-auth.middleware";
import userModel from "../../database/user.model";
import { JWT_SECRET } from "../../enviroment";
import { UserToken } from "../types/user.types";

app.post("/validate", validateToken, async (req: Request, res: Response) => {
    return res.status(200).json({"success": true});
});

app.post("/login", async (req: Request, res: Response) => {
    console.log("HI")
    const userName = req.body["user_name"];
    const userPassword = req.body["user_password"];

    if(!userName){
        return res.status(400).json({"error": "User Name not set!"})
    }
    if(!userPassword){
        return res.status(400).json({"error": "Password not set!"})
    }

    const user = userModel.getByUsername(userName);
    if(user){
        if(await bcrypt.compare(userPassword, user.passwordHash)){
            const token = jwt.sign({userId: user.id} as UserToken, JWT_SECRET, {expiresIn: "1h"});
            return res.json({"token": token, "user_identifier": user.id})
        } else {
            return res.status(403).json({"error": "Password does not match!"})
        };
    } else {
        return res.status(400).json({"error": "User not found!"})
    }
});