import multer from "multer";
import publicFileModel from "../../database/public-file.model";
import userFileModel from "../../database/user-file.model";
import userModel from "../../database/user.model";
import { FILES_PATH } from "../../enviroment";
import path from "path";
import { userFiles } from "../../utils/files/userFiles";
import { publicFiles } from "../../utils/files/publicFiles";

const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
    fileFilter: async (req, file, cb) => {
        try {
            const userIdentifier = req.headers["user_identifier"] as string;
            const toPublic = req.headers["public"] === "true";
                // Fetch user and check limits
                const user = userModel.get(userIdentifier);
                if (!user) return cb(new Error("Invalid user"));
            
            if(!toPublic){
                const userCount = await userFileModel.getFileCount(user.id);
                if (userCount >= 15) return cb(new Error("Too many files"));
            }

            cb(null, true);
        } catch (error) {
            cb(error as Error);
        }
    }
});

