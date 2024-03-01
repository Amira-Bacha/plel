import styles from "./styles.module.css";
import { Link,
	useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import imgUK from "../assets/UK.svg"

import {SiFacebook,SiTwitter,SiLinkedin} from 'react-icons/si';

import InfoUser from './InfoUser'
import Actu from './Actu'
import Calendar from './Calendar'
import Rooms from './rooms'
import Trainings from './Trainings'
import Footer from "../footer"
import SliderNav from '../slider'
import imgLogo from '../assets/logo.jpg'
import Nav from "../Nav"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Button from '@mui/material/Button';

const ProfileTrainer = (props) =>{
    let { id } = useParams();
    const token = localStorage.getItem("token")

	const [error, setError] = useState("");

	const user = JSON.parse(localStorage.getItem("user"));
	
	
    
    
/*///////////////////////////////////*/
	
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
		window.removeEventListener("scroll", handleScroll);
		};
	}, []);
    // useEffect(()=>{
	// 	if(scrollPosition>=300){
	// 		window.document.querySelector(".styles_scndInfos__YSEZn").style.marginTop=-320 + "px"
	// 	}else{
	// 		window.document.querySelector(".styles_scndInfos__YSEZn").style.marginTop=0 + "px"
	// 	}
	// },[scrollPosition])
	
/*///////////////////////////////////*/
const WindowState=localStorage.getItem("Window State")

    useEffect(() => {
        (WindowState)
        if(WindowState==="actu"){
            setActu(true)
            setProfile(false)
            setCalendar(false)
        }
     },[])

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
        window.location = "/login"
	};
    const[actu, setActu] =useState(false)
    const[profile, setProfile] =useState(true)
    const[calendar, setCalendar] =useState(false)
    const[rooms, setRooms] =useState(false)
    const[trainings, setTrainings] =useState(false)
    
    const handleActu = () =>{
        setActu(true)
        setProfile(false)
        setCalendar(false)
    }
    const handleCalendar = () =>{
        setActu(false)
        setProfile(false)
        setCalendar(true)
    }

    const handleRooms = () =>{
        setActu(false)
        setProfile(false)
        setRooms(true)
        setCalendar(false)
    }
    const handleProfile = () =>{
        if (!profile){
            setProfile(true)
            setActu(false)
            setCalendar(false)
        }

    }

    const handleTrainings = () =>{
        setActu(false)
        setProfile(false)
        setRooms(false)
        setCalendar(false)
        setTrainings(true)

    }
	
/************///////////////////////// */
const [WindowWidth, setWindowWidth] = useState(0);
const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
    
};

useEffect(() => {
    handleWidthChange()
    window.addEventListener('resize', handleWidthChange);
    return () => {
    window.removeEventListener('resize', handleWidthChange);
    };
}, []);
const [mobileView, setMobileView]=useState(false)
useEffect(()=>{
    //(WindowWidth)
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[])
useEffect(()=>{
    (WindowWidth)
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[WindowWidth])


    return(
		<React.Fragment>
			<Nav/>
			<main className={styles.MotherDivProfile}>
				<div className={styles.MainDivProfile}>
					{profile ? 
                    
                        <InfoUser user={user}/>
                        
                        :

                        <React.Fragment>
                            {actu?
                        
                                <Actu setActu={setActu} user={user}/>

                        :

                                <React.Fragment>
                                    {calendar?
                                
                                        <Calendar  user={user} />

                                :

                                        <React.Fragment>
                                            {rooms?
                                        
                                                <Rooms user={user}  />

                                        :

                                            <React.Fragment>
                                                {trainings?
                                            
                                                    <Trainings user={user}  />

                                            :

                                            ""
                                            
                                            }
                                            </React.Fragment>
                                        
                                        }
                                        </React.Fragment>
                                
                                }
                                </React.Fragment>
                        
                            }
                        </React.Fragment>
                }
					<div className={styles.rightSectionProfile}>
                   
						<div className={styles.scndInfos} >
                             <h5 className={styles.titleWelcome}>welcome {user.name}</h5>
                            <Button onClick={handleProfile} className={styles.Button} variant="outlined" startIcon={<AccountCircleIcon />}>
                                Personnal Informations
                            </Button>

                            <Button onClick={handleActu} className={styles.Button}  variant="outlined" startIcon={<FormatListBulletedIcon />}>
                                Actu Mandats
                            </Button>

                            <Button onClick={handleTrainings} className={styles.Button}  variant="outlined" startIcon={<HistoryEduIcon />}>
                                Trainings
                            </Button>

                            <Button onClick={handleCalendar} className={styles.Button}  variant="outlined" startIcon={<CalendarMonthIcon />}>
                                Calendar
                            </Button>

                            <Button onClick={handleRooms} className={styles.Button}  variant="outlined" startIcon={<VoiceChatIcon />}>
                                Rooms
                            </Button>

                            
                        </div>
					</div>
				</div>
						
			</main>
            <Footer/>

		</React.Fragment>
    )
}

export default ProfileTrainer;