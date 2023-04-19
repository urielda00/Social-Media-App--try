import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import exp from 'constants';
import { error } from 'console';



//internal imports:
import {register} from './controllers/auth.js';
import {createPost} from './controllers/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
//fake users and posts:
import {users, posts} from './data/index.js';




//configurations: (only when we use the type:module!)
const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
dotenv.config();
const app= express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb'}));
app.use(express.urlencoded({limit:'30mb', extended: true }))
// app.use(bodyParser.urlencoded({}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



//file storage- (later move it into seperate file):
const storage= multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'public/assets')
  },
  filename: (req,file,cb)=>{
    cb(null, file.originalname)
  }
});

const upload= multer({storage});


//routes with files:
app.post('auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)



//routes:
app.use('/auth', authRoutes)
//( this route is ment for displaying some schemas,  while the user is in the home page- for example):
app.use('/users', userRoutes)
app.use('/posts', postRoutes)







// mongoose setup and connection to the DB:
const port= process.env.PORT||5000;
const mongoUrl= process.env.MONGO_URL;
mongoose.connect(mongoUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  app.listen(port, ()=>console.log(`The port is listening at: ${port}`))
  //Add the data one time (use this only when I need to. that nodemon will not run this every time!):
  // User.insertMany(users);
  // Post.insertMany(posts);
})
.catch((error)=>console.log(`${error}, did not connect!`))