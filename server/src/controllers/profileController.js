import User from "../models/userModel.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// export const addToProfile = async(req, res)=>{
//     try{
//         const id = req.params;
//         const {userName, bio, hobbies, dob} = req.body;
//         const photo = req.file ? req.file.filename:"";

//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//         }
// };
export const getUserProfile = async(req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"})
            }
        return res.status(200).json({user: user});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}

export const getAllUser = async(req,res)=>{
  try{
    const users = await User.find();
    return res.status(200).json({users: users});

  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
}

export const getProfileImage = async(req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"})
            }
            const image = user.profileImage;
            res.sendFile(path.join(__dirname, `../assets/profilePictures/${image}`));
        }
        catch(error){
            return res.json({error: error.message});
        }
    }
    export const updateProfile = async (req, res) => {
        try {
          const id = req.params.id;
          const { username, bio, hobbies, dob } = req.body;
          const profileImage = req.file ? req.file.filename : "";
      
          const updatedData = { username, bio, hobbies, dob };
      
          if (profileImage) {
            updatedData.profileImage = profileImage;
          }
      
          const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
      
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          return res.status(200).json({
            message: "Profile updated successfully",
            data: user
          });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
      