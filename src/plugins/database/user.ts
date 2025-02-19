import bcrypt from "bcryptjs";

import database from "./database";
import { User } from "../interfaces";

export default class userModel{
    static async createUser(userIdentifier: string, password: string): Promise<boolean> {
        if(this.getUser(userIdentifier))return false;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        try{
            const stmt = database.prepare(`
                INSERT INTO users (userId, passwordHash)
                VALUES (?,?)
            `)
            stmt.run(userIdentifier, passwordHash);
            return true;
        } catch(e) {
            return false;
        }
    }

    static getUser(userIdentifier: string): User | undefined {
        const stmt = database.prepare("SELECT * FROM users WHERE userId = ?");
        return stmt.get(userIdentifier) as User | undefined;
    } 
}