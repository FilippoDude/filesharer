import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import database from "./database";
import { User } from "../interfaces";

export default class userModel{
    static async createUser(userName: string, password: string): Promise<boolean> {
        if(this.getUserByUsername(userName))return false;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        var userId = uuidv4();
        while(true){
            try{
                const stmt = database.prepare(`
                    INSERT INTO users (id, userName, passwordHash)
                    VALUES (?,?,?)
                `)
                stmt.run(userId, userName, passwordHash);
                return true;
            } catch(e: any) {
                if (e.code === "SQLITE_CONSTRAINT") {
                    console.warn("UUID collision detected, retrying...");
                    userId = uuidv4(); 
                } else {
                    return false;
                }
            }
        }
    }

    static getUser(userIdentifier: string): User | undefined {
        const stmt = database.prepare("SELECT * FROM users WHERE id = ?");
        return stmt.get(userIdentifier) as User | undefined;
    } 
    static getUserByUsername(userName: string): User | undefined {
        const stmt = database.prepare("SELECT * FROM users WHERE userName = ?");
        return stmt.get(userName) as User | undefined;
    } 
}