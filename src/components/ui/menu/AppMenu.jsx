import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import useAppStore from '@/store/useAppStore';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import Slide from '@mui/material/Slide';
import './appMenuStyles.scss';
export const MenuOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px"  viewBox="0 -960 960 960"  fill="#ffffff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>;
export const MenuCloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>;

export default function AppMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const setActivity = useAppStore(state => state.setActivity);
  const activity = useAppStore(state => state.activity);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const toggleOpen = (event) => {
    setAnchorEl(event.currentTarget);
     setOpen(!open);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    console.log("handleClose");
  };

  return (
    <div className={"AppMenu"+(activity === -1 ? "" : " hide")}>
      <div
        className="burger-stack"
        id="burger-button"
        
         
      >
        {/* {open ? <MenuCloseIcon /> : <MenuOpenIcon />} */}
        <input type="checkbox" id="checkbox1" value={open} checked={open} className="checkbox1 visuallyHidden" onChange={toggleOpen} />
        <label htmlFor="checkbox1">
            <div className="hamburger hamburger1">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
                <span className="bar bar4"></span>
            </div>
        </label>
      </div>
      <ul className={open ? " open" : " "} id="app-menu">


        <li onClick={() => {
          handleClose();
          setActivity(-1);
          const el = document.getElementById("tools");

          el.scrollIntoView({ behavior: "smooth", block: "start" })
          
        }}>Tools</li>
        
        {/* <li onClick={handleClose}>Journeys</li> */}
        {/* <li onClick={handleClose}>Motivation</li> */}
        {/* <li onClick={handleClose}>Dailys</li> */}
        <li onClick={() => {
           handleClose();
          setActivity(-1);
          const el = document.getElementById("daysCounter");

          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        }>Days Counter</li>
       
          
         <li onClick={() => {
           handleClose();
          setActivity(-1);
          const el = document.getElementById("gratitude");

          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        }>Gratitude</li>
        <li onClick={() => {
          handleClose();
          setActivity(-1);
          const el = document.getElementById("share");

          el.scrollIntoView({ behavior: "smooth", block: "start" })
          
        }}>Spread the love</li>
          <li onClick={() => {
          handleClose();
          setActivity(-1);
          const el = document.getElementById("intro");

          el.scrollIntoView({ behavior: "smooth", block: "start" })
          
        }}>Install</li>
         <li onClick={() => {
           handleClose();
          setActivity(-1);
          const el = document.getElementById("feedback");

          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        }>Feedback</li>
        {/* <li onClick={handleClose}>Tour</li> */}
        {/* <li onClick={handleClose}>Settings</li> */}
      </ul> 
    </div>
  );
}



