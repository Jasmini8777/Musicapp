import React, { useEffect, useState } from 'react'

import "./sidebar.css"

import SidebarButton from './sidebarButton'
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from '../../spotify';


export default function Sidebar() {
  const {image, setImage} = useState(
    
    "https://cdn.pixabay.com/photo/2015/06/26/18/40/person-822803_960_720.jpg"
  );
  

 

  useEffect(() =>{
apiClient.get("me").then(response => {
  console.log(response.data.images[0].url)
})

  }, [])

  
  return (
    <div className="sidebar-container">
         <img src="https://cdn.pixabay.com/photo/2015/06/26/18/40/person-822803_960_720.jpg" className="profile-img" alt="profile"/>
    
    <div>
    <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>

      
      <SidebarButton title="Sign Out" to="/signout" icon={<FaSignOutAlt />} />
  
    </div>
  )
}
