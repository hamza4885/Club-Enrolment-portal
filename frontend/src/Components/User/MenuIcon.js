import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { ListAltRounded, Person2Rounded, ShoppingCart, ExitToAppRounded } from '@mui/icons-material';
import { Backdrop } from '@mui/material';
import image from "../Assets/Images/Profile.jpg"
import { useNavigate } from 'react-router-dom';
import { FaCcDinersClub } from 'react-icons/fa';

export default function MenuIcon({clubId}) {
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  // Define the options for the SpeedDial actions
  const options = [

    { icon: <Person2Rounded />, name: 'Profile',func:Profile},
    { icon: <FaCcDinersClub />, name: 'Clubs',func:Clubs},
    { icon: <ExitToAppRounded />, name: 'Logout', func: logout },
  ];
  
  function logout(){
     navigate("/login")
  }
 
 function Profile(){
  navigate("/clubs/userProfile")
}
function Clubs(){
    navigate("/")
}
  return (
    <>
      <Backdrop 
        open={open} 
        sx={{ 
          zIndex: 10, 
          color: '#fff', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust backdrop color and opacity
        }}
      />
      <SpeedDial
        ariaLabel="User SpeedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ 
          position: 'fixed', 
          top: '1vmax', 
          right: '3vmax', 
          zIndex: 11,
        }}
        direction="down"
        open={open}
        icon={
          <img 
          src={user?.avatar?.url || image}
            alt="User Avatar" 
            style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
          />
        }
      >
        {options.map((action) => (
          <SpeedDialAction
            key={action.name}
            onClick={action.func}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
}
