import jwt from 'jsonwebtoken';


//this middleware is for verify before every action that the user is still logged in!
export const varifyToken= async (req,res, next)=>{
  try {
  let token= req.header('Authorization')
  if(!token) return res.status(403).send('Access Denied')
  if(token.startWith('Bearer')){
    token= token.slice(7, token.length).trimLeft()
  }
  const verified= jwt.verify(token, process.env.JWT_SECRET);
  req.user= verified;

  //and continue to the next middleware/ actual func (we done here!):
  next(); 
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}