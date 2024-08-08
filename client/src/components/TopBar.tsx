import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/users/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../config/constants";
import { assets } from "../assets/assets";
function TopBar() {

  const [profileImage,setProfileImage] = useState('');
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const logoutUser=()=>{
    console.log("logout");
    dispatch(logout());
    nagivate('/login');
  }
  const handleUserIconClick = () => {
    setShowOptions(!showOptions);
    console.log(profileImage);
  };

  useEffect(() => {
    setProfileImage(user._id ? `${baseUrl}profile/profileImage/${user._id}` : assets.profile);
  }, [user._id, baseUrl]);


  return (
    <>
      <div className="nav bg-black h-10 text-white w-full flex justify-end align-baseline items-center border-b">
        <div className="flex items-center justify-center">
          {/* setting icon */}

         <div>
         <button className="mr-2 focus:outline-none">
            <i className="fas fa-cog"></i>
          </button>
         </div>

          {/* notification icon */}
     <div>
     <button className="mr-2 focus:outline-none">
            <i className="fas fa-bell"></i>
          </button>
     </div>

          {/* usericon with dropdown */}
          {/* <button
            className="mr-2 focus:outline-none"
            onClick={handleUserIconClick}
          >
            <i className="fas fa-user"></i>
            <img src={profileImage} alt="" />
          </button> */}

          <div className="bg-white rounded-full h-8 w-8" onClick={handleUserIconClick}>
            <img src={profileImage} alt="" className="h-full w-full rounded-full object-cover"
            />
          </div>
          {showOptions && (
            <div className="absolute right-2 top-8 mt-2 bg-violet-600 rounded shadow-lg">
            <Link to = "/profile">
              <button className="block w-full text-left py-2 px-4 hover:bg-violet-800 rounded focus:outline-none border-b border-black">
                Profile
              </button>
              </Link>
              <button className="block w-full text-left py-2 px-4 hover:bg-violet-800 rounded focus:outline-none" onClick={logoutUser}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TopBar;
