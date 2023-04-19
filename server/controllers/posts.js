import Post from '../models/Post.js';
import User from '../models/User.js';



//create:
export const createPost= async (req,res)=>{
  try {
    const {userId, description ,picturePath}= req.body; 
    const user= await User.findById(userId);
    const newPost= new Post({
      userId,
      firstName:user.firstName,
      lastName: user.lastName,
      location:user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments:[]
    });
    await newPost.save();

    const post= Post.find();
    res.status(201).json(post); //send all the posts to the frontend.

  } catch (err) {
    res.status(409).json({message: err.message})
  
  }
};

//ALL THE READs:

export const getFeedPosts= async (req,res)=>{
  try {
    const post= Post.find();
    res.status(200).json(post); 


  } catch (err) {
    res.status(404).json({message: err.message})
  }
};


//get the user posts:
export const getUserPosts= async (req,res)=>{
  try {

    const {userId}= req.params;
    const post= Post.find({userId});
    res.status(200).json(post); 

  } catch (err) {
    res.status(404).json({message: err.message})
  }
};



//UPDATE:
 export const likePost= async (req,res)=>{
  try {
    const {id}= req.params;
    const {userId}= req.body;
    const post= await Post.findById(id);
    const isLiked= post.likes.get(userId);
     
    //check if the id is in the likes obj: remove like, else- add like
    if(isLiked){
      post.likes.delete(userId);s
    }else{
      post.likes.set(userId, true);
    }

    const updatedPost= Post.findByIdAndUpdate( 
      id,
      {likes:post.likes},
      {new:true}
    );
    res.status(200).json(updatedPost); 
  } catch (err) {
    res.status(404).json({message: err.message})
  }
 };