import styles from "./styles.module.css";
import { Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {SiFacebook,SiTwitter,SiLinkedin} from 'react-icons/si';
import imgUK from "../assets/UK.svg"

import InfoUser from './InfoUser'
import Cart from './cart'
import Courses from './Courses'
import Trainings from './Trainings'
import Footer from "../footer"
import SliderNav from '../slider'
import Loading from '../Loading'
import imgLogo from '../assets/logo.jpg'
import Nav from "../Nav"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Button from '@mui/material/Button';
const ProfileTrainer = (props) =>{

    const [user,SetUser]=useState()
    const [isLoading, setLoading] = useState(true);
    const token = localStorage.getItem("token")

    useEffect(()=>{
        const config = {
            headers: { authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS" },
            "withCredentials": true
        };
        const url2 = `${process.env.REACT_APP_API}/api/userData`;
        try{
            axios.post(url2,{},config)
            .then(response => {
                
                localStorage.setItem("user", JSON.stringify(response.data.data));
                SetUser(response.data.data)
                setLoading(false)
                
            })
            }catch (err) {
                }
    },[])
	const [error, setError] = useState("");

    const [allCourses,setAllCourses] =  useState();


    useEffect(()=>{
        handleSubmit()
    },[])
        
    const handleSubmit = async () => {
        try {
        const url = `${process.env.REACT_APP_API}/api/courses`;
        await axios.post(url, {headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
        .then(res => {
            setAllCourses(res.data.data)
        })
        } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
        }
        }
    };



	    
    const [date, setDate] = React.useState();

    
    const[cart, setCart] =useState(false)
    const[profile, setProfile] =useState(true)
    const[courses, setCourses] =useState(false)
    const[trainings, setTrainings] =useState(false)
    
    const handleCart = () =>{
        setCart(true)
        setProfile(false)
        setTrainings(false)
        setCourses(false)

    }
    const handleCourses = () =>{
        setCart(false)
        setProfile(false)
        setCourses(true)
        setTrainings(false)
    }
    const handleTrainings = () =>{
        setCart(false)
        setProfile(false)
        setCourses(false)
        setTrainings(true)

    }
    const handleProfile = () =>{
        if (!profile){
            setProfile(true)
            setCart(false)
            setCourses(false)
            setTrainings(false)

        }

    }

    const handleChange = (event) => {
        setDate(event.target.value);
    };

    const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
        window.location = "/login"
	};
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
    //  useEffect(()=>{
	//  	if(scrollPosition>=300){
	//  		window.document.querySelector(".styles_scndInfos__+lj3r").style.marginTop=-320 + "px"
	//  	}else{
	//  		window.document.querySelector(".styles_scndInfos__+lj3r").style.marginTop=0 + "px"
	//  	}
	//  },[scrollPosition])
/*//////////////////////////////////////////////////////////////////////////*/	
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
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[])
useEffect(()=>{
        if(WindowWidth<=756){
            setMobileView(true)
        }else{
            setMobileView(false)
        }
    
},[WindowWidth])

    if(isLoading){
        return (
            <Loading/>
        )
    }

    return(
		<React.Fragment>
			<Nav/>
			<main className={styles.MotherDivProfile}>
				<div className={styles.MainDivProfile}>
					{profile ? 
                        <InfoUser user={user} allCourses={allCourses}/>
                        
                    :
                    <React.Fragment>
                        {cart ?
                            <Cart user={user} />
                            
                        : 
                        <React.Fragment>
                            {courses ?
                                    <Courses user={user} />
                                
                                :
                                <React.Fragment>
                                    {trainings ?
                                        <Trainings user={user}/>

                                        :""    
                                
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

                            <Button onClick={handleCart} className={styles.Button} variant="outlined" startIcon={<ShoppingBasketIcon />}>
                            Cart
                            </Button>

                            <Button onClick={handleTrainings} className={styles.Button} variant="outlined" startIcon={<HistoryEduIcon />}>
                            Trainings
                            </Button>
                            <Button onClick={handleCourses} className={styles.Button} variant="outlined" startIcon={<OndemandVideoIcon />}>
                            Courses
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