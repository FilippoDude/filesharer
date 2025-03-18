import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import database from "./database";
import { User } from "../plugins/types/user.types";
import { DatabaseError } from "../errors/database.errors";

export default class userModel{
    static async create(userName: string, passwordHash: string): Promise<String> {
        var id = uuidv4();
        while(true){
            try{
                const stmt = database.prepare(`
                    INSERT INTO users (id, userName, passwordHash)
                    VALUES (?,?,?)
                `)
                stmt.run(id, userName, passwordHash);
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

    static get(userIdentifier: string): User | undefined {
        try{
            const stmt = database.prepare("SELECT * FROM users WHERE id = ?");
            return stmt.get(userIdentifier) as User | undefined;
        } catch (e){
            throw new DatabaseError(e);
        }
    } 
    static getByUsername(userName: string): User | undefined {
        try{
        const stmt = database.prepare("SELECT * FROM users WHERE userName = ?");
        return stmt.get(userName) as User | undefined;
        } catch (e){
            throw new DatabaseError(e);
        }
    } 
}