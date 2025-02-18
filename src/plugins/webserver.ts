import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";

const app = express();     
const upload = multer({ dest: "uploads/" });

app.use(cors());

//app.use(express.json());
//app.use(cors({origin: '*',methods: ['GET', 'POST'],}));

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully!", filename: req.file.filename });
});

app.get('/', (req, res) => {
    res.send('Hello, world! The server is running!');
  });

app.listen(3000, async () => {
    console.log('Server is listening on port 3000!');
});


