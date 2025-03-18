import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserToken } from "../types/user.types";
import { JWT_SECRET } from "../../enviroment";

export const validateToken = (req: Request, res: Response, next: any) => {
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
        if(!decoded.userId || decoded.userId !== userIdentifier){
            throw new Error("Token invalid!");
        } 
        next();
    } catch(e){
        return res.status(403).json({"error": "Token is not valid!"});
    }
}