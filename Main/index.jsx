import styles from "./styles.module.css";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import React, {useRef, useEffect, useState } from "react";
import { ImSearch } from 'react-icons/im';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import courseImg  from '../assets/courseImg.svg'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import img from "../assets/courseImg.svg"
import imgUK from "../assets/UK.svg"
import Typography from '@mui/material/Typography';
import {MdArrowForwardIos} from 'react-icons/md';
import Google from "../assets/Google.png"
import Oxford from "../assets/Oxford.png"
import Microsoft from "../assets/Microsoft.png"
import IBM from "../assets/IBM.png"
import Cambridge from "../assets/Cambridge.png"
import {SiFacebook,SiTwitter,SiLinkedin} from 'react-icons/si';
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion"
import { Swipeable } from "react-swipeable";
// import logo from "../assets/logo2.jpg"
import Footer from "../footer"
import ApplyTrainer from "./ApplyTrainer";
import imgLogo from '../assets/logo.jpg'
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Nav from "../Nav"
const Main = () => {

    const [CatalogueState, setCatalogueState]=useState("Trainings")

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <Arrow/>,
        prevArrow: <Arrow/>
      };

      function Arrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            
          />
        );
      }

    const token = localStorage.getItem("token")
	const user = JSON.parse(localStorage.getItem("user"));
 
	

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
        window.location = "/login"
	};
    

    const OurTrainers = [
        {
            name: 'Name & Surname',
            speciality: 'speciality',
            thumbnail:"C:/Users/ELAYEB/OneDrive/Bureau/pfe project/Implimentation/client/src/component/assets/courseImg.svg"
        },
        {
            name: 'Name & Surname',
            speciality: 'speciality',
            thumbnail:"C:/Users/ELAYEB/OneDrive/Bureau/pfe project/Implimentation/client/src/component/assets/courseImg.svg"
        },
        {
            name: 'Name & Surname',
            speciality: 'speciality',
            thumbnail:"C:/Users/ELAYEB/OneDrive/Bureau/pfe project/Implimentation/client/src/component/assets/courseImg.svg"
        }
    ]

   

      const TextRating = (value,avis) => {
        return (
            <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
                ml: 1.7,
            }}
            >
            <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>({avis} avis)</Box>
            </Box>
        );
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

            var [CoursesList,setCoursesList]=useState([]);
            var [TrainingsList,setTrainingsList]=useState([]);

    useEffect(()=>{
        handleSubmit()
    },[])
        
    
    const handleSubmit = async () => {
        try {
        const url = `${process.env.REACT_APP_API}/api/trainings`;
        axios.post(url, {headers: {'X-Requested-With': 'XMLHttpRequest', "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`, "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}}, { "withCredentials": true })
        .then(res => {
    
            setTrainingsList(res.data.data)
            localStorage.setItem("AllTrainingsList", JSON.stringify(res.data.data))
            // CoursesList.forEach(element => {
                
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
                setCoursesList(res.data.data)
                localStorage.setItem("AllCoursesList", JSON.stringify(res.data.data))
                // CoursesList.forEach(element => {
                    
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

    const [categorySelected, setCategorySelected]= useState("All Categories")

    const ListCourses = CoursesList.map((element) => {
        if(element.Category===categorySelected){
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
        }else if(categorySelected==="All Categories"){
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

      const ListTrainings = TrainingsList.map((element) => {
        if(element.Category===categorySelected){
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
                        {TextRating2(element.rating,element.evaluate.length)}

                            {/* {TextRating2(element.note,element.avis)} */}
                        </div>
                            <p className={styles.priceFooter}>{element.Price} TTC</p>
                        {/* <p className={styles.priceFooter}>{element.price} $ HT</p> */}
                    </div>
                    
                </div>
                </Link>
            )
        }else if(categorySelected==="All Categories"){
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
                        {TextRating2(element.rating,element.evaluate.length)}

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


      /*********************************************************** */
      /*********************************************************** */
      /*********************************************************** */
      /*********************************************************** */
      /*********************************************************** */
      /*********************************************************** */


      



    /*********************************************************** */
    /*********************************************************** */
    /*********************************************************** */
    /*********************************************************** */
    /*********************************************************** */
    /*********************************************************** */
    /*********************************************************** */
    /*********************************************************** */
      const [openApply, setOpenApply]=useState(false)

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
			});

	}

      const categories=categoriesFromBd.map(c=>{return c.Title})

      


    const [width, setWidth] = useState(0)

  const carousel = useRef()
  useEffect(()=>{
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  },[])

    // var topTrainingElementsList = listCourses
    // topTrainingElementsList.sort((a,b) => (a.note > b.note) ? 1 : ((b.note > a.note) ? -1 : 0))
    // topTrainingElementsList.reverse()
    // topTrainingElementsList=topTrainingElementsList.slice(0, 4);
    /*/////////////////////////////////////////////////////////////////////////////*/
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
    /*/////////////////////////////////////////////////////////////////////////////*/

    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[WindowWidth])
    
    const topTrainingElements = TrainingsList.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0)).reverse().slice(0,4).sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0)).map((element,index) => {
            return(
                <motion.div className={styles.topTrainingElement}
                >
                     {
                            element.Thumbnail ? 
                            <CardMedia
                            component="img"
                            height="140"  
                            src={`${process.env.REACT_APP_API}/${element.Thumbnail.filePath}`} alt=""  className={styles.imgTop}   />
                            :
                                <CardMedia
                                component="img"
                                height="140" 
                                src={`${process.env.REACT_APP_API}/uploads/courseImg.png`} alt="" className={styles.imgTop}   />
                                
                            
                                
                        }
                    
                    <div className={styles.infoCourse}>
                        <p  className={styles.cardCategory}>
                            {element.Category}
                        </p>
                        <hr  className={styles.cardCategoryHr}/>
                        
                        <Typography
                            className={styles.cardTitle} noWrap>
                            {element.Title}
                        </Typography>
                        <hr  className={styles.cardCenterHr}/>
                        <p  className={styles.cardLevel}>
                            Level: <span>{element.Level}</span>
                        </p>
                        <div className={styles.cardRating}>
                            {TextRating(element.rating,element.evaluate.length)}
                        </div>
                        <div className={styles.cardFooter}>
                            <p>{element.Price} TTC</p>
                            <button type="button" onClick={()=>{window.location=`/Course/${element._id}`}} >
                                Explore
                            </button>
                            <div className={styles.triangle}></div>
                        </div>
                        
                    </div>
                    </motion.div>
            )
          })
    

          return (
            <React.Fragment className={styles.body}>
                <Nav/>
                <section className={styles.sectionOne}> 
                    <div  className={styles.motivationDiv}>
                        <div  className={styles.motivationQuotes}>
                            <h1>
                            Let’s build the <br />
                            future together
                            </h1>
                            <h5>
                            “Coming together is a beginning; keeping <br />
                            together is progress; working together is <br />
                            success.”<span> ~ Henry Ford</span>
                            </h5>
                            <Link to="/signup">
                                <div  className={styles.Motivation_btn}>
                                    <a type="button">
                                        Join now
                                    </a>
                                </div>
                            </Link>
                        </div>
                        <div  className={styles.motivationImg}></div>
                    </div>
                </section>
                <section className={styles.sectionTwo}>
                    <h1>
                    Top Trainings
                    </h1>
                        <div className={styles.topTrainingElements}>
                            <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: "grabbing"}}>
                                <motion.div drag="x" dragConstraints={{right:0, left:-width}} className={styles.inner_carousel}>
                                    {topTrainingElements}
                                </motion.div>
                            </motion.div>
                                    
                            
                        </div>
                    
                        {/* <Slider  className={styles.Slider} {...settings}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                        </Slider> */}
                    
                </section>
                <section className={styles.sectionThree}>
                    <div className={styles.CatalogContainer}>
                        
                        <div className={styles.MenuContainer}>
                            <div  className={styles.catalogTitleBack}>
                                <p>
                                    Catalog
                                </p>
                            </div>
                            <div className={styles.catalogcategoriesBack}>
                                <div className={styles.catalogcategories}>
                                    <div onClick={()=>{setCategorySelected("All Categories")}} className={styles.catalogcategoriesButton}>
                                        {categorySelected==="All Categories"?
                                            <ArrowForwardIosIcon/>
                                            :""    
                                        }
                                        <Typography 
                                        sx={{ml:3}}
                                        className={styles.catalogcategoriesButtonText} noWrap>
                                            All Categories
                                        </Typography>
                                    </div>
                                {categories.map((element) => {
                                    return(
                                        <Tooltip title={element}>
                                            <div onClick={()=>{setCategorySelected(element)}} className={styles.catalogcategoriesButton}>
                                            {categorySelected===element?
                                                <ArrowForwardIosIcon/>
                                                :""    
                                            }
                                                <Typography 
                                                sx={{ml:3}}
                                                className={styles.catalogcategoriesButtonText} noWrap>
                                                    {element}
                                                </Typography>
                                            </div>
                                        </Tooltip>
                                    )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className={styles.CoursesContainer}>
                           
                            <div className={styles.Back}>
                                <div className={styles.CatalogueTypes}>
                                    <Button onClick={()=>{setCatalogueState("Trainings")}}>Trainings</Button>
                                    <Button onClick={()=>{setCatalogueState("Courses")}}>Courses</Button>
                                </div>
                                <div className={styles.Header}>
                                    <div className={styles.searchBar}>
                                        <div  className={styles.DivSearchIcon}>
                                            <ImSearch  className={styles.searchIcon} size={20}/>
                                        </div>
                                        <input placeholder="search..." type="text" />
                                    </div>
                                    <div className={styles.Button}>
                                        <MdArrowForwardIos size={20}/>
                                    </div>
                                </div>
                                <div  className={styles.main}>
                                    <div className={styles.mainCourses}>
                                        
                                        <div className={styles.ListCourses}>
                                                
                                                {CatalogueState === "Courses"?
    
                                                                ListCourses
    
                                                                : 
                                                                ListTrainings
    
                                                }
                                                
                                        </div>
                                    </div>
                                    <div  className={styles.rightContainer}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
    
                <section className={styles.sectionFour}>
                    <h1>
                        Our Trainers
                    </h1>
                    <div className={styles.OurTrainers}>
                        {OurTrainers.map((trainer)=>{
                            return(
                                <div className={styles.trainer}>
                                    <div className={styles.ImgTrainer}>
                                        <img src={img} alt="" />
                                    </div>
                                    <div className={styles.TrainerInfo}>
                                        <h1>{trainer.name}</h1>
                                        <h2>{trainer.speciality}</h2>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <section className={styles.sectionFive}>
                    <h1>
                        Our Partners
                    </h1>
                        <div className={styles.OurPartners}>
                            {/* <Slider  className={styles.Slider} {...settings}>
                                
                                <div>
                                    <img src={Google} alt="" />
                                </div>
                                <div>
                                    <img src={IBM} alt="" />
                                </div>
                                <div>
                                    <img src={Cambridge} alt="" />
                                </div>
                                <div>
                                    <img src={Oxford} alt="" />
                                </div>
                                <div>
                                    <img src={Microsoft} alt="" />
                                </div>
                                <div>
                                    <img src={Google} alt="" />
                                </div>
                                <div>
                                    <img src={IBM} alt="" />
                                </div>
                                <div>
                                    <img src={Cambridge} alt="" />
                                </div>
                                <div>
                                    <img src={Oxford} alt="" />
                                </div>
                                <div>
                                    <img src={Microsoft} alt="" />
                                </div>
                            </Slider> */}
                        </div>
                </section>
                <section className={styles.sectionSix}>
                   <div className={styles.TextSectionSix}>
                        <h1>
                            CONSULTANTS - TRAINERS, <br />
                                    JOIN US!
                        </h1>
                        <h2>
                            As part of our professional training activity, we are 
                            <br />   
                            constantly looking for new consultant trainers.
                        </h2>
                   </div>
                   <div  className={styles.ButtonSectionSix}>
                        <button onClick={()=>{setOpenApply(true)}} className={styles.ApplyButton}>
                            Apply Now ! 
                        </button>
                   </div>
                </section>
                <Footer/>
                <ApplyTrainer openApply={openApply} setOpenApply={setOpenApply}/>
            </React.Fragment>
      )
    };
    
    
    export default Main;