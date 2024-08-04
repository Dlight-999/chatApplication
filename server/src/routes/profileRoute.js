import express from 'express';
import multer from 'multer';
import { getProfileImage, getUserProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();
const storgae = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'src/assets/profilePictures');
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
})
const upload = multer({storage:storgae});
router.get('/getUser/:id', getUserProfile);
router.patch('/updateProfile/:id',upload.single('photo'),updateProfile);
router.get('/profileImage/:id', getProfileImage);
export default router;