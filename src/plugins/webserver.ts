import express, { Request, Response } from "express";
import cors from "cors";
import userModel from "../database/user.model";

export const app = express();     
app.use(cors()); //app.use(cors({origin: '*',methods: ['GET', 'POST'],}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('^_^');
});

app.listen(3000, async () => {
    //        const salt = await bcrypt.genSalt(10);
    //    const passwordHash = await bcrypt.hash(password, salt);
    //console.log(await userModel.createUser("filippodude", "investBig!"));
    console.log("HI")
});


import "./routes/file.routes"
import "./routes/public-file.routes"
import "./routes/user-file.routes"
import "./routes/user-auth.routes"