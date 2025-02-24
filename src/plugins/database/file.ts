import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import database from "./database";
import { FileDataDatabase } from "../interfaces";
import userModel from "./user";

export default class fileModel{
    static async save(fileId: string, userId: string, fileName: string): Promise<boolean> {
        if(this.getFile(fileId))return false;
        if(!userModel.getUser(userId)) return false;

        try{
            const stmt = database.prepare(`
                INSERT INTO files (id, userId, fileName)
                VALUES (?,?,?)
            `)
            stmt.run(fileId, userId, fileName);
            return true;
        } catch(e) {
            return false;
        }
    }

    static getFile(fileId: string): FileDataDatabase | undefined {
        const stmt = database.prepare("SELECT * FROM files WHERE id = ?");
        return stmt.get(fileId) as FileDataDatabase | undefined;
    } 
    static removeFile(fileId: string): void {
        const stmt = database.prepare("SELECT * FROM files WHERE id = ?");
    } 
}