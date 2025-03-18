import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import database from "./database";
import { FileDataDatabase } from "../plugins/types/file.types";
import { DatabaseError } from "../errors/database.errors";

export default class userFileModel{
    static async create(userId: string, fileName: string): Promise<string> {
        var id = uuidv4();
        while(true){
            try{
                const stmt = database.prepare(`
                    INSERT INTO files (id, userId, fileName)
                    VALUES (?,?,?)
                `)
                stmt.run(id, userId, fileName);
                return id;
            }catch(e: any) {
                if (e.code === "SQLITE_CONSTRAINT") {
                    id = uuidv4(); 
                } else {
                    throw new DatabaseError(e);
                }
            }
        }
    }

    static get(fileId: string): FileDataDatabase | undefined {
        try{
            const stmt = database.prepare("SELECT * FROM files WHERE id = ?");
            return stmt.get(fileId) as FileDataDatabase | undefined;
        } catch (e){
            throw new DatabaseError(e);
        }
    } 

    static remove(fileId: string): void {
        try{
            const stmt = database.prepare("SELECT * FROM files WHERE id = ?");
        } catch (e){
            throw new DatabaseError(e);
        }
    } 
}