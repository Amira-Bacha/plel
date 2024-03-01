import React, {useRef, useEffect, useState } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import imgLogo from '../assets/logo.jpg'
import SliderNav from './slider'
import styles from "./styles.module.css";
import Box from '@mui/material/Box';
import imgUK from "../assets/UK.svg"
import Typography from '@mui/material/Typography';
import axios from 'axios'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


const Nav =()=>{


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
        //console.log(WindowWidth)
            if(WindowWidth<=756){
                setMobileView(true)
            }else{
                setMobileView(false)
            }
        
    },[])
    useEffect(()=>{
        console.log(WindowWidth)
            if(WindowWidth<=756){
                setMobileView(true)
            }else{
                setMobileView(false)
            }
        
    },[WindowWidth])

    var [CoursesList,setCoursesList]=useState([]);
            var [TrainingsList,setTrainingsList]=useState([]);

    useEffect(()=>{
        handleSubmit()
        console.log(process.env.REACT_APP_API)
    },[])
        
    
    const handleSubmit = async () => {
        try {
        const url = `${process.env.REACT_APP_API}/api/trainings`;
        axios.post(url, {headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
        .then(res => {
    
            setTrainingsList(res.data.data)
            console.log(res.data.data)
            localStorage.setItem("AllTrainingsList", JSON.stringify(res.data.data))
            // CoursesList.forEach(element => {
                
            //     console.log(element)
            //     console.log(element._id)
            // });
            
    
        })
        } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            // setError(error.response.data.message);
        }
        }
        try {
            const url = `${process.env.REACT_APP_API}/api/courses`;
            axios.post(url, {headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
            .then(res => {
                console.log(res)
                setCoursesList(res.data.data)
                console.log(res.data.data)
                localStorage.setItem("AllCoursesList", JSON.stringify(res.data.data))
                // CoursesList.forEach(element => {
                    
                //     console.log(element)
                //     console.log(element._id)
                // });
                
        
            })
            } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // setError(error.response.data.message);
            }
            }
    };

    const token = localStorage.getItem("token")
	const user = JSON.parse(localStorage.getItem("user"));

    const [displaySerch, setDisplaySearch] =useState(false)
    const [searchCategories, setSearchCategories]= useState([])

    const handleSearchChange=async (e)=>{
        const search = e.target.value
        if(search === "" || search === " "){
            setSearchCategories(["none"])
        }

        if(search!=="" && search!==" "){
            if(categories.includes(search)){
                setSearchCategories([search])
            }else{
                const list = search.split("")
                var listCats = []
                 categories.map(async c=>{
                    const catList = c.split("")
                    if(catList.slice(0, list.length).join("").toLowerCase()===list.join("").toLowerCase()){
                        listCats.push(c)
                    }else{
                        listCats.push("none")
                    }
                })
    
                setSearchCategories(listCats)
    
            }
        }
    }

    const TextRating2 = (value,avis) => {
        return (
            <Box
            sx={{
                width: 80,
                display: 'flex',
                alignItems: 'center',
                ml: 1,
            }}
            >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box  ><p className={styles.MuiBox}>({avis} avis)</p></Box>
            </Box>
        );
        }

        const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location = "/login"
        };



        useEffect(async ()=>{
            await HandleCategories()
          },[])
          
        const [categoriesFromBd, setCategoriesFromBd] = useState([])
    
        const HandleCategories = async () =>{
            const config={
                headers: {authorization: `Bearer ${token}`,'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                "withCredentials": true 
            }
            await axios.get(`${process.env.REACT_APP_API}/api/Category/getCategories`,config)
                .then(async res=>{
                    setCategoriesFromBd(res.data.data)
                    console.log(res.data.data)
                });
    
        }
    
          const categories=categoriesFromBd.map(c=>{return c.Title})
    


    const ListCoursesSearch= (cat) => CoursesList.map((element) => {
        if(element.Category===cat){
            return(
                <Link  to={{pathname : `/Course/${element._id}` }} onClick={()=>{
                    user && (user.lastSeen = [...user.lastSeen, element._id])
                    localStorage.setItem("user", JSON.stringify(user));
                    window.scrollTo(0, 0);
                }}>
                    
                
                <div key={element._id}  className={styles.Courses}>
                    <div className={styles.display}>
                    {
                            element.Thumbnail ? 
                                <img src={`${process.env.REACT_APP_API}/${element.Thumbnail.filePath}`} alt=""  className={styles.imgCourse}  />
                            :
                                <img src={`${process.env.REACT_APP_API}/uploads/courseImg.png`} alt="" className={styles.imgCourse} />
                                
                            
                                
                        }
                        
                        <div className={styles.ListCoursesInfoCourse}>
                            <p  className={styles.ListCoursesCardCategory}>
                                {element.Category}
                            </p>
                            <hr  className={styles.ListCoursesCardCategoryHr}/>
                            
                            <Typography
                                className={styles.ListCoursesCardTitle} noWrap>
                                {element.Title}
                            </Typography>
                            <hr  className={styles.ListCoursesCardCenterHr}/>
                            <p  className={styles.ListCoursesCardLevel}>
                                Level: <span>{element.Level}</span>
                                {/* Level: <span>{element.Level}</span> */}
                            </p>
                            
                        </div>
                       
                    </div>
                    <div className={styles.ListCoursesFooter}>
                        <div className={styles.ListCoursesCardRating}>
                            {TextRating2(element.rating,element.evaluate.length)}
                            {/* {TextRating2(element.note,element.avis)} */}
                        </div>
                            <p className={styles.priceFooter}>{element.Price}  TTC</p>
                        {/* <p className={styles.priceFooter}>{element.price} $ HT</p> */}
                    </div>
                    
                </div>
                </Link>
            )
        }
      })

      const ListTrainingsSearch= (cat) => TrainingsList.map((element) => {
        if(element.Category===cat){
            return(
                <Link  to={{pathname : `/Training/${element._id}` }} onClick={()=>{
                    user && (user.lastSeen = [...user.lastSeen, element._id])
                    localStorage.setItem("user", JSON.stringify(user));
                    window.scrollTo(0, 0);
                }}>
                    
                
                <div key={element._id}  className={styles.Courses}>
                    <div className={styles.display}>
                    {
                            element.Thumbnail ? 
                                <img src={`${process.env.REACT_APP_API}/${element.Thumbnail.filePath}`} alt=""  className={styles.imgCourse}  />
                            :
                                <img src={`${process.env.REACT_APP_API}/uploads/courseImg.png`} alt="" className={styles.imgCourse} />
                                
                            
                                
                        }
                        <div className={styles.ListCoursesInfoCourse}>
                            <p  className={styles.ListCoursesCardCategory}>
                                {element.Category}
                            </p>
                            <hr  className={styles.ListCoursesCardCategoryHr}/>
                            
                            <Typography
                                className={styles.ListCoursesCardTitle} noWrap>
                                {element.Title}
                            </Typography>
                            <hr  className={styles.ListCoursesCardCenterHr}/>
                            <p  className={styles.ListCoursesCardLevel}>
                                Level: <span>{element.Level}</span>
                                {/* Level: <span>{element.Level}</span> */}
                            </p>
                            
                        </div>
                    
                    </div>
                    <div className={styles.ListCoursesFooter}>
                        <div className={styles.ListCoursesCardRating}>
                            {TextRating2(3,75)}
                            {/* {TextRating2(element.note,element.avis)} */}
                        </div>
                            <p className={styles.priceFooter}>{element.Price} TTC</p>
                        {/* <p className={styles.priceFooter}>{element.price} $ HT</p> */}
                    </div>
                    
                </div>
                </Link>
            )
        }
      })



    return(
        <React.Fragment>
            <nav className={styles.nav}>
                <div className={styles.firstNav}>
                    
                        <div className={styles.logo}>
                            <Link to="/"><img style={{marginTop:"10px" ,width: "180px"}} className={styles.LogoImg} src={imgLogo}/> </Link>
                        </div>
                    
                    <div className={styles.contact}>
                    <Link to="/contact">
                            <a type="button" className={styles.nav_btn_special_contact}>
                                Contact
                            </a>
                    </Link>
                    <div className={styles.language}>
                        <p>EN</p>
                        <img src={imgUK} alt="" />
                    </div>
                    </div>
                    
                </div>
                <div className={styles.scndNav}>
                    {!mobileView ? 
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
                                        <a type="button" onClick={handleLogout} className={styles.nav_btn}>
                                            Logout
                                        </a>
                                    </Link>
                                </React.Fragment>
                            }
                        </div>
                        :
                        <React.Fragment>
                            <SliderNav user={user} handleLogout={handleLogout}/>
                        </React.Fragment>
                    }
                    <div className={styles.search}>
                        <input type="text" onBlur={()=>{setDisplaySearch(false)}} onFocus={()=>{setDisplaySearch(true)}} onChange={async(e)=>{await handleSearchChange(e)}} placeholder="Search for training..." />
                    </div>
                    
                </div>
                <Box  sx={!displaySerch? {visibility: "hidden"}: {visibility: "visible"}} className={styles.searchResultDiv}>
                        {
                            searchCategories.length>0?
                                searchCategories.map(s=>{
                                    if(s==="none"){
                                        return(<></>)
                                    }
                                    return (
                                        <div className={styles.divSearchIntern}>
                                            <h4>{s}</h4>
                                            <div className={styles.divSearchInternforTypes}>
                                                <div className={styles.divTypeSearch}>
                                                    <h4>Trainings</h4>
                                                    {ListTrainingsSearch(s)}
                                                </div>
                                                <div className={styles.divHv}></div>
                                                <div className={styles.divTypeSearch}>
                                                    <h4>Courses</h4>
                                                    {ListCoursesSearch(s)}
                                                </div>
                                            </div>

                                        </div>
                                    )
                            
                                })
                            :
                                <p>No result for search</p>
                        }
                    
                    
                </Box>
            </nav>
        </React.Fragment>
    )
}


export default Nav