const app = express();     
app.use(express.json());
app.use(cors({
origin: '*',
    methods: ['GET', 'POST'],
}));

app.post('/', async (req: Request, res: Response) => { 
    const { type } = req.body
    const { authorization } = req.headers;

})

app.get('/', (req, res) => {
    res.send('Hello, world! The server is running!');
  });

app.listen(3000, async () => {
    console.log('Server is listening on port 3000!');
});


