import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./styles.module.css";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function SliderNav({user, handleLogout}) {
  const [toggle, setToggle] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setToggle(open);
  };

  const list = () => (
    <Box
      sx={{ width:  250 }}
      role="presentation"
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer(false)}
      className={styles.slide}
    >
      <div className={styles.logo}>
          SkilzIt
          <ArrowLeftIcon onClick={()=>{toggleDrawer(false)}} sx={{width:"50px", fontSize:40, cursor:"pointer"}}/>
      </div>
      <div className={styles.Links}>
          <Link to="/">
              <a type="button" className={styles.nav_btn}>
                  Home
              </a>
          </Link>
          <Link to="/aboutus">
              <a type="button" className={styles.nav_btn}>
                  AboutUs
              </a>
          </Link>
          {!user? 
              <React.Fragment>
                  <Link to="/login">
                      <a type="button" className={styles.nav_btn}>
                          Login
                      </a>
                  </Link>
                  <Link to="/signup">
                      <a type="button" className={styles.nav_btn_special}>
                          SignUp
                      </a>
                  </Link>
              </React.Fragment>
              :
              <React.Fragment>
                  {user.userType === "Admin" ?

                      <Link to="/admin">
                      <a type="button" className={styles.nav_btn}>
                          {/* {user.userType} */}
                          Profile
                      </a>
                      </Link>
                  :
                      <Link to="/profile">
                          <a type="button" className={styles.nav_btn}>
                              {/* {user.userType} */}
                              Profile
                          </a>
                      </Link>
              
                  }
                  <Link to="/">
                      <a type="button" onClick={handleLogout} className={styles.nav_btn_special}>
                          Logout
                      </a>
                  </Link>
              </React.Fragment>
          }
      </div>
    </Box>
  );

  return (
        <React.Fragment>
          <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: '#1C4B82' }}/></Button>
          <SwipeableDrawer
            open={toggle}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
  );
}
