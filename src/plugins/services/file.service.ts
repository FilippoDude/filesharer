import multer from "multer";
import publicFileModel from "../../database/public-file.model";
import userFileModel from "../../database/user-file.model";
import userModel from "../../database/user.model";
import { FILES_PATH } from "../../enviroment";
import path from "path";
import { userFiles } from "../../utils/files/userFiles";
import { publicFiles } from "../../utils/files/publicFiles";

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userIdentifier = req.headers["user_identifier"] as string;
        const toPublicHeader = req.headers["public"] as string;
        const toPublic = toPublicHeader === "true";
        
        const user = userModel.get(userIdentifier);
        if(user){
            if(toPublic){
                return cb(null, publicFiles.createFolder()); 
            } else {
                return cb(null, userFiles.createFolder(userIdentifier)); 
            }
        } else {
            return cb(new Error("Invalid user"), "");
        }
    },
    filename: async (req, file, cb) => {
        const userIdentifier = req.headers["user_identifier"] as string;
        const toPublicHeader = req.headers["public"] as string;
        const toPublic = toPublicHeader === "true";
        var fileName;
        if(toPublic){
            fileName = await publicFileModel.create(file.originalname);
        } else {

            fileName = await userFileModel.create(userIdentifier, file.originalname);
        }
        return cb(null, fileName); 
    }
});

export const upload = multer({ storage: userStorage });